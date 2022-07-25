const express = require("express");
const Teachers = require("../model/Teacher");
const Admin = require("../model/Admin");
const Parents = require("../model/Parents");
const router = express.Router();
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const verifyJWTandAdmin = require("../middleware/verifyJWTandAdmin");

// CREATE
router.post("/", async (req, res) => {
    const { admin_username, admin_password, admin_email } = req.body;
    // Validation
    if (!admin_username || !admin_password || !admin_email)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        });
    if (admin_password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must have at least 6 characters.",
        });
    }
    try {
        // check for existing user
        const adminValidate = await Admin.findOne({ admin_email });
        const parentValidate = await Parents.findOne({
            parent_email: admin_email,
        });
        const teacherValidate = await Teachers.findOne({
            teacher_email: admin_email,
        });
        if (adminValidate || parentValidate || teacherValidate)
            return res
                .status(400)
                .json({ success: false, message: "Email address is existing" });
        // Good to die

        // all good
        const hashPassword = await argon2.hash(admin_password);
        const newUser = new Admin({
            admin_username,
            admin_password: hashPassword,
            admin_email,
        });
        await newUser.save();
        //return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.json({
            success: true,
            message: "Create admin successfully",
            accessToken,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// GET
router.get("/", verifyJWTandAdmin, async (req, res) => {
    try {
        // Return token
        const alladmin = await Admin.find({});
        res.json({ success: true, alladmin });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// GET By ID
router.get("/:id", verifyJWTandAdmin, async (req, res) => {
    try {
        // Return token
        const alladmin = await Admin.findById(req.params.id);
        res.json({ success: true, alladmin });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// PUT
router.put("/:id", verifyJWTandAdmin, async (req, res) => {
    const { admin_username, admin_password, admin_email } = req.body;
    // Validation
    if (!admin_username || !admin_password || !admin_email)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information",
        });
    if (admin_password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must have at least 6 characters.",
        });
    }
    try {
        const hashPassword = await argon2.hash(admin_password);
        let updateadmin = {
            admin_username,
            admin_password: hashPassword,
            admin_email,
        };
        const postUpdateCondition = { _id: req.params.id, user: req.userId };
        updatedadmin = await Admin.findOneAndUpdate(
            postUpdateCondition,
            updateadmin,
            { new: true }
        );

        if (!updateadmin)
            return res
                .status(401)
                .json({ success: false, message: "admin not found" });
        res.json({ success: true, message: "Updated!", parent: updateadmin });
    } catch {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Delete
router.delete("/:id", verifyJWTandAdmin, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId };
        const deletedadmin = await Admin.findOneAndDelete(postDeleteCondition);

        if (!deletedadmin)
            return res
                .status(401)
                .json({ success: false, message: "admin not found" });
        res.json({ success: true, message: "Deleted!", parent: deletedadmin });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;
