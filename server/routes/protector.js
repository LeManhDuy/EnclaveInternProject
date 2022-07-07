const express = require("express");
const router = express.Router();
const Parents = require("../model/Parents");
const Protectors = require("../model/Protector");

// Create
router.post("/:parentID", async (req, res) => {
    const { parentID } = req.params;
    const {
        protector_name,
        protector_address,
        protector_phone,
        protector_relationship,
        parent_id,
    } = req.body;
    // Validation
    if (
        !protector_name ||
        !protector_address ||
        !protector_phone ||
        !protector_relationship
    ) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Missing information.Please fill in!",
            });
    }
    if (protector_phone.length != 10) {
        return res
            .status(400)
            .json({
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
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Get protectors from parent
router.get("/get-protector/:parentID", async (req, res) => {
    const { parentID } = req.params;

    try {
        const parent = await Parents.findById(parentID).populate("protectors");
        return res
            .status(200)
            .json({
                parent_name: parent.parent_name,
                protectors: parent.protectors,
            });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Get protectors from parent
router.get("/:protectorID", async (req, res) => {
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
router.put("/:protectorID", async (req, res) => {
    const { protectorID } = req.params;
    try {
        const updateProtector = req.body;
        const result = await Protectors.findByIdAndUpdate(
            protectorID,
            updateProtector
        );

        return res.status(200).json({ success: true, message: "Updated!" });
    } catch (error) {
        return res.status(400).json({ success: false, message: "" + error });
    }
});

// Delete
router.delete("/:protectorID", async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id };
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
    } catch {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;
