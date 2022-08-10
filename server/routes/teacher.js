const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWTandTeacher");
const Teachers = require("../model/Teacher");
const Admin = require("../model/Admin");
const Parents = require("../model/Parents");
const Classes = require("../model/Class");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const verifyJWTandAdmin = require("../middleware/verifyJWTandAdmin");
const multer = require("multer");
const fs = require("fs");

router.post("/teacher", verifyJWTandAdmin, (req, res) => {
    res.send("Teacher page");
});

// Storage
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./uploads/teachers");
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
    "/",
    verifyJWTandAdmin,
    upload.single("teacher_img"),
    async (req, res) => {
        const {
            teacher_name,
            teacher_age,
            teacher_gender,
            teacher_phone,
            teacher_email,
            teacher_password,
        } = req.body;
        let teacher_img = null;
        if (req.file) {
            teacher_img = req.file.path;
        }
        // Validation
        if (
            !teacher_name ||
            !teacher_phone ||
            !teacher_email ||
            !teacher_password
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing information.Please fill in!",
            });
        }
        if (teacher_phone.length != 10) {
            return res.status(400).json({
                success: false,
                message: "Phone number must have 10 numbers",
            });
        }
        if (teacher_password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must have at least 6 characters.",
            });
        }
        try {
            const adminValidate = await Admin.findOne({
                admin_email: teacher_email,
            });
            const parentValidate = await Parents.findOne({
                parent_email: teacher_email,
            });
            const teacherValidate = await Teachers.findOne({ teacher_email });
            if (adminValidate || parentValidate || teacherValidate)
                return res.status(400).json({
                    success: false,
                    message: "Email address is existing",
                });
            // Good to die
            // Good to die
            const hashPassword = await argon2.hash(teacher_password);
            const teacher = new Teachers({
                teacher_name,
                teacher_age,
                teacher_gender,
                teacher_phone,
                teacher_email,
                teacher_password: hashPassword,
                teacher_img,
            });
            await teacher.save();
            // Return token
            const accessToken = jwt.sign(
                { userId: teacher._id },
                process.env.ACCESS_TOKEN_SECRET
            );
            res.json({
                success: true,
                message: "Create teacher successfully",
                accessToken,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        }
    }
);

// Get
router.get("/", verifyJWTandAdmin, async (req, res) => {
    try {
        // Return token
        const allTeachers = await Teachers.find({});
        res.json({ success: true, allTeachers });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Get teacher has no class
router.get("/get-teacher/", verifyJWTandAdmin, async (req, res) => {
    try {
        // Return token
        const allTeachers = await Teachers.find({ teacher_class: undefined });
        res.json({ success: true, allTeachers });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

router.get("/:teacherID", async (req, res) => {
    try {
        const teacher = await Teachers.findOne({ _id: req.params.teacherID });
        if (!teacher)
            return res
                .status(400)
                .json({ success: false, message: "Teacher not found" });
        res.json({ success: true, teacher });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

router.put(
    "/:teacherID",
    upload.single("teacher_img"),
    verifyJWTandAdmin,
    async (req, res) => {
        const {
            teacher_name,
            teacher_age,
            teacher_gender,
            teacher_phone,
            teacher_email,
            teacher_password,
        } = req.body;
        let teacher_img = null;
        if (req.file) {
            teacher_img = req.file.path;
        }
        // Validation
        if (!teacher_name || !teacher_phone) {
            return res.status(400).json({
                success: false,
                message: "Missing information.Please fill in!",
            });
        }
        if (teacher_phone.length != 10) {
            return res.status(400).json({
                success: false,
                message: "Phone number must have 10 numbers",
            });
        }
        if (teacher_password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must have at least 6 characters.",
            });
        }
        try {
            const teacher = await Teachers.findById(req.params.teacherID);
            if (teacher.teacher_img) {
                if (teacher_img === null) {
                    teacher_img = teacher.teacher_img;
                } else {
                    fs.unlink("./" + teacher.teacher_img, (err) => {
                        if (err)
                            res.status(400).json({
                                success: false,
                                message: "Image error: " + err,
                            });
                        console.log("successfully deleted file");
                    });
                }
            }
            const hashPassword = await argon2.hash(teacher_password);
            let updateTeacher = {
                teacher_name,
                teacher_age,
                teacher_gender,
                teacher_phone,
                teacher_email,
                teacher_password: hashPassword,
                teacher_img,
            };
            const postUpdateCondition = { _id: req.params.teacherID };

            updatedTeacher = await Teachers.findOneAndUpdate(
                postUpdateCondition,
                updateTeacher,
                { new: true }
            );

            if (!updatedTeacher)
                return res
                    .status(401)
                    .json({ success: false, message: "Teacher not found" });
            res.json({
                success: true,
                message: "Updated!",
                teacher: updateTeacher,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        }
    }
);

router.delete("/:teacherID", verifyJWTandAdmin, async (req, res) => {
    try {
        const teacher = await Teachers.findById(req.params.teacherID);
        if (teacher.teacher_img) {
            fs.unlink("./" + teacher.teacher_img, (err) => {
                if (err)
                    res.status(400).json({
                        success: false,
                        message: "Image error: " + err,
                    });
                console.log("successfully deleted file");
            });
        }
        if (teacher.teacher_class) {
            const classroom = await Classes.findById(teacher.teacher_class);
            classroom.teacher_id = undefined;
            classroom.teacher_name = "";
            await classroom.save();
        }
        const postDeleteCondition = { _id: req.params.teacherID };
        const deletedTeacher = await Teachers.findOneAndDelete(
            postDeleteCondition
        );

        if (!deletedTeacher)
            return res
                .status(401)
                .json({ success: false, message: "Teacher not found" });
        res.json({
            success: true,
            message: "Deleted!",
            parent: deletedTeacher,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;
