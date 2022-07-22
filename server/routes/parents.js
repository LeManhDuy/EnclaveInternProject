const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const Teachers = require("../model/Teacher");
const Admin = require("../model/Admin");
const Parents = require("../model/Parents");
const Protectors = require("../model/Protector");
const verifyJWTandAdmin = require("../middleware/verifyJWTandAdmin");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./uploads/parents");
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

// @route POST api/admin/parents/create
// @desc Create parents
// @access Private Only Admin

router.post(
    "/",
    verifyJWTandAdmin,
    upload.single("parent_img"),
    async (req, res) => {
        const {
            parent_name,
            parent_dateofbirth,
            parent_address,
            parent_phone,
            parent_email,
            parent_job,
            parent_gender,
            parent_password,
        } = req.body;
        let parent_img = null;
        if (req.file) {
            parent_img = req.file.path;
        }
        // Validation
        if (
            !parent_name ||
            !parent_address ||
            !parent_phone ||
            !parent_password
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing information.Please fill in!",
            });
        }
        if (parent_phone.length != 10) {
            return res.status(400).json({
                success: false,
                message: "Phone number must have 10 numbers",
            });
        }
        if (parent_password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must have at least 6 characters.",
            });
        }
        try {
            const adminValidate = await Admin.findOne({
                admin_email: parent_email,
            });
            const parentValidate = await Parents.findOne({ parent_email });
            const teacherValidate = await Teachers.findOne({
                teacher_email: parent_email,
            });
            if (adminValidate || parentValidate || teacherValidate)
                return res.status(400).json({
                    success: false,
                    message: "Email address is existing",
                });
            const hashPassword = await argon2.hash(parent_password);

            const parents = new Parents({
                parent_name,
                parent_dateofbirth,
                parent_address,
                parent_phone,
                parent_email,
                parent_job,
                parent_gender,
                parent_password: hashPassword,
                parent_img,
            });
            await parents.save();
            // Return token
            const accessToken = jwt.sign(
                { userId: parents._id },
                process.env.ACCESS_TOKEN_SECRET
            );
            res.json({
                success: true,
                message: "Create account successfully",
                accessToken,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        }
    }
);

// @route GET api/admin/parents/get
// @desc GET parents
// @access Private Only Admin

router.get("/", verifyJWTandAdmin, async (req, res) => {
    try {
        // Return token
        const allParents = await Parents.find({});
        res.json({ success: true, allParents });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

router.get("/:parentID", async (req, res) => {
    try {
        const parent = await Parents.findById(req.params.parentID);
        if (!parent)
            return res
                .status(400)
                .json({ success: false, message: "Parent not found" });
        res.json({ success: true, parent });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route PUT api/admin/parents/
// @desc Update parents
// @access Private Only Admin
router.put(
    "/:parentID",
    upload.single("parent_img"),
    verifyJWTandAdmin,
    async (req, res) => {
        const {
            parent_name,
            parent_dateofbirth,
            parent_address,
            parent_phone,
            parent_email,
            parent_job,
            parent_gender,
            parent_password,
            parent_img,
        } = req.body;
        // Validation
        if (
            !parent_name ||
            !parent_address ||
            !parent_phone ||
            !parent_password
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing information.Please fill in!",
            });
        }
        if (parent_phone.length != 10) {
            return res.status(400).json({
                success: false,
                message: "Phone number must have 10 numbers",
            });
        }
        if (parent_password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must have at least 6 characters.",
            });
        }
        try {
            const hashPassword = await argon2.hash(parent_password);
            let updateParent = {
                parent_name,
                parent_dateofbirth,
                parent_address,
                parent_phone,
                parent_email,
                parent_job,
                parent_gender,
                parent_password: hashPassword,
                parent_img: req.file.path,
            };
            const postUpdateCondition = { _id: req.params.parentID };

            const parent = await Parents.findById(req.params.parentID);
            fs.unlink("./" + parent.parent_img, (err) => {
                if (err)
                    res.status(400).json({
                        success: false,
                        message: "Image error: " + err,
                    });
                console.log("successfully deleted file");
            });
            updatedParent = await Parents.findOneAndUpdate(
                postUpdateCondition,
                updateParent,
                { new: true }
            );

            if (!updateParent)
                return res
                    .status(401)
                    .json({ success: false, message: "Parent not found" });
            res.json({
                success: true,
                message: "Updated!",
                parent: updateParent,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        }
    }
);

// @route DELETE api/admin/parents/
// @desc DELETE parents
// @access Private Only Admin
router.delete("/:parentID", verifyJWTandAdmin, async (req, res) => {
    try {
        const postDeleteCondition = {
            _id: req.params.parentID,
        };
        const deletedParent = await Parents.findOneAndDelete(
            postDeleteCondition
        );

        if (!deletedParent)
            return res
                .status(401)
                .json({ success: false, message: "Parent not found" });
        res.json({ success: true, message: "Deleted!", parent: deletedParent });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;
