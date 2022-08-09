const express = require("express");
const router = express.Router();
const Parents = require("../model/Parents");
const Protectors = require("../model/Protector");
const verifyJWTandParent = require("../middleware/verifyJWTandParent");
const multer = require("multer");
const fs = require("fs");

// Storage
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./uploads/protectors");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Create
router.post(
    "/:parentID",
    upload.single("protector_img"),
    verifyJWTandParent,
    async (req, res) => {
        const { parentID } = req.params;
        const {
            protector_name,
            protector_address,
            protector_phone,
            protector_relationship,
            parent_id,
        } = req.body;
        let protector_img = null;
        if (req.file) {
            protector_img = req.file.path;
        }
        // Validation
        if (
            !protector_name ||
            !protector_address ||
            !protector_phone ||
            !protector_relationship
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing information.Please fill in!",
            });
        }
        if (protector_phone.length != 10) {
            return res.status(400).json({
                success: false,
                message: "Phone number must have 10 numbers",
            });
        }
        if (!parentID) {
            return res
                .status(400)
                .json({ success: false, message: "Cannot find the parentID!" });
        }
        try {
            const parent = await Parents.findById(parentID);
            const newProtector = new Protectors({
                protector_name,
                protector_address,
                protector_phone,
                protector_relationship,
                parent_id: parent,
                protector_img,
            });
            await newProtector.save();
            parent.protectors.push(newProtector._id);
            await parent.save();
            res.json({
                success: true,
                message: "Create subject successfully",
                protector: newProtector,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        }
    }
);

// Get protectors from parent
router.get("/get-protector/:parentID", verifyJWTandParent, async (req, res) => {
    const { parentID } = req.params;

    try {
        const parent = await Parents.findById(parentID).populate("protectors");
        return res.status(200).json({
            parent_name: parent.parent_name,
            protectors: parent.protectors,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Get protectors from id
router.get("/:protectorID", verifyJWTandParent, async (req, res) => {
    const { protectorID } = req.params;

    try {
        const protector = await Protectors.findById(protectorID);
        const parent = await Parents.findById(protector.parent_id.toString());
        return res
            .status(200)
            .json({ protector: protector, relative: parent.parent_name });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Update
router.put(
    "/:protectorID",
    upload.single("protector_img"),
    verifyJWTandParent,
    async (req, res) => {
        const { protectorID } = req.params;
        const {
            protector_name,
            protector_address,
            protector_phone,
            protector_relationship,
        } = req.body;
        // Validation
        if (
            !protector_name ||
            !protector_address ||
            !protector_phone ||
            !protector_relationship
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing information.Please fill in!",
            });
        }
        if (protector_phone.length != 10) {
            return res.status(400).json({
                success: false,
                message: "Phone number must have 10 numbers",
            });
        }
        let protector_img = null;
        if (req.file) {
            protector_img = req.file.path;
        }
        try {
            const protector = await Protectors.findById(req.params.protectorID);
            if (protector.protector_img) {
                if (protector_img === null) {
                    protector_img = protector.protector_img;
                } else {
                    fs.unlink("./" + protector.protector_img, (err) => {
                        if (err)
                            res.status(400).json({
                                success: false,
                                message: "Image error: " + err,
                            });
                        console.log("successfully deleted file");
                    });
                }
            }

            const updateProtector = {
                protector_name,
                protector_address,
                protector_phone,
                protector_relationship,
                protector_img,
            };
            const postUpdateCondition = { _id: req.params.protectorID };

            updatedProtector = await Teachers.findOneAndUpdate(
                postUpdateCondition,
                updateProtector,
                { new: true }
            );
            if (!updatedProtector)
                return res
                    .status(401)
                    .json({ success: false, message: "Protector not found" });
            return res.status(200).json({ success: true, message: "Updated!" });
        } catch (error) {
            return res
                .status(400)
                .json({ success: false, message: "" + error });
        }
    }
);

// Delete
router.delete("/:protectorID", verifyJWTandParent, async (req, res) => {
    try {
        const protector = await Protectors.findById(req.params.protectorID);
        const parent = await Parents.findById(protector.parent_id.toString());
        if (protector.protector_img) {
            fs.unlink("./" + protector.protector_img, (err) => {
                if (err)
                    res.status(400).json({
                        success: false,
                        message: "Image error: " + err,
                    });
                console.log("successfully deleted file");
            });
        }
        if (parent) {
            parent.protectors.remove(protector._id.toString());
            parent.save()
        }
        const postDeleteCondition = { _id: req.params.protectorID };
        const deletedProtector = await Protectors.findOneAndDelete(
            postDeleteCondition
        );

        if (!deletedProtector)
            return res
                .status(401)
                .json({ success: false, message: "Protector not found" });
        res.json({
            success: true,
            message: "Deleted!",
            protector: deletedProtector,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;
