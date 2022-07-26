require("dotenv").config();
const express = require("express");
const router = express.Router();
const verifyJWTandTeacher = require("../middleware/verifyJWTandTeacher");
const Student = require("../model/Student");
const Teacher = require("../model/Teacher");
const Class = require("../model/Class");
const Parent = require("../model/Parents");
const Score = require("../model/Score");
const SummaryScore = require("../model/SummaryScore");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./uploads/students");
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
// @route GET dashboard/teacher/create-student
// @desc create student information
// @access Private
router.post(
    "/:classID&:parentID",
    verifyJWTandTeacher,
    upload.single("student_image"),
    async (req, res) => {
        const { classID, parentID } = req.params;
        const { student_fullname, student_gender, student_dateofbirth } =
            req.body;
        let student_image = null;
        if (req.file) {
            student_image = req.file.path;
        }
        //Simple validation
        if (!student_fullname || student_gender == null || !student_dateofbirth)
            return res.status(400).json({
                success: false,
                message: "Please fill in complete information",
            });
        try {
            const classInfor = await Class.findById(classID);
            const parent = await Parent.findById(parentID);
            //save collection
            const newStudent = new Student({
                student_fullname,
                student_dateofbirth,
                student_gender,
                student_image,
                parent_id: parent._id,
                class_id: classInfor._id,
            });
            await newStudent.save();
            classInfor.students.push(newStudent._id);
            await classInfor.save();
            parent.children.push(newStudent._id);
            await parent.save();
            res.json({
                success: true,
                message: "Create student successfully",
                studentFullName: newStudent.student_fullname,
                studentDateOfBirth: newStudent.student_dateofbirth,
                studentGender: newStudent.student_gender,
                studentImage: newStudent.student_image,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        }
    }
);

// // @route GET dashboard/teacher/get-student-by-teacher-id
// // @desc get student information
// // @access Private
// router.get(
//     "/get-student-by-teacher-id/:teacherID",
//     verifyJWTandTeacher,
//     async (req, res) => {
//         const { teacherID } = req.params;
//         try {
//             const teacher = await Teacher.findById(teacherID).populate(
//                 "students",
//                 ["_id", "student_fullname", "student_gender", "student_image"]
//             );

//             const arrStudentId = [];
//             teacher.students.map((item) => {
//                 arrStudentId.push(item._id);
//             });
//             const getStudentById = await Student.find({ _id: arrStudentId })
//                 .populate("class_id", ["class_name"])
//                 .populate("subjects", ["subject_name"])
//                 .populate("summary", ["summary_score", "summary_behavior"])
//                 .select([
//                     "student_fullname",
//                     "student_gender",
//                     "student_image",
//                 ]);

//             return res.status(200).json({
//                 teacherName: teacher.teacher_name,
//                 studentInformation: getStudentById,
//             });
//         } catch (error) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "" + error });
//         }
//     }
// );

// // @route GET dashboard/teacher/get-all-student
// // @desc get student information
// // @access Private
// router.get("/get-all-student", verifyJWTandTeacher, async (req, res) => {
//     try {
//         // Return token
//         const allStudent = await Student.find({})
//             .populate("class_id", ["class_name"])
//             .populate("parent_id", ["parent_name"])
//             .populate("subjects", ["subject_name"])
//             .populate("summary", ["summary_score", "summary_behavior"])
//             .select(["student_fullname", "student_gender", "student_image"]);
//         return res.status(200).json({
//             StudentInformation: allStudent,
//         });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "" + error });
//     }
// });

// @route GET dashboard/teacher/parent-get-student-information
// @desc parent get student information
// @access Private
router.get("/parent-get-student-information/:studentID", async (req, res) => {
    const { studentID } = req.params;
    try {
        // Return token
        //sutdent
        const getStudentById = await Student.findById(studentID)
            .populate("class_id", ["class_name"])
            .populate("parent_id", ["parent_name", "parent_address"]);
        if (!getStudentById)
            return res
                .status(401)
                .json({ success: false, message: "Student is not found!" });
        return res.status(200).json({
            studentImage: getStudentById.student_image,
            studentFullName: getStudentById.student_fullname,
            studentDateOfBirth: getStudentById.student_dateofbirth,
            studentGender: getStudentById.student_gender,
            studentAddress: getStudentById.parent_id.parent_address,
            className: getStudentById.class_id.class_name,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route GET dashboard/teacher/parent-get-student-score-information
// @desc parent get student score information by student id
// @access Private
router.get(
    "/parent-get-detailed-score-information/:studentID",
    async (req, res) => {
        const { studentID } = req.params;
        try {
            // Return token
            //sutdent
            const getStudentById = await Student.findById(studentID)
                .populate("subjects", ["_id"])
                .select("student_fullname");

            const arrSubjectId = [];
            getStudentById.subjects.map((item) => {
                arrSubjectId.push(item._id);
            });

            const getScorebySubjectId = await Score.find({
                subject_id: arrSubjectId,
            }).populate("subject_id", ["subject_name"]);

            const getSummaryScoreByStudentId = await SummaryScore.find({
                student_id: studentID,
            });

            if (!getStudentById)
                return res
                    .status(401)
                    .json({ success: false, message: "Student is not found!" });
            return res.status(200).json({
                studentFullName: getStudentById.student_fullname,
                detailedScoreInformation: getScorebySubjectId,
                summaryScore: getSummaryScoreByStudentId.map(
                    (getSummaryScoreByStudentId) =>
                        getSummaryScoreByStudentId.summary_score
                ),
                summaryBehavior: getSummaryScoreByStudentId.map(
                    (getSummaryScoreByStudentId) =>
                        getSummaryScoreByStudentId.summary_behavior
                ),
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        }
    }
);

// @route PUT dashboard/teacher/update-student
// @desc Update stduent
// @access Private Only Admin
router.put(
    "/:id",
    verifyJWTandTeacher,
    upload.single("student_image"),
    async (req, res) => {
        const { student_fullname, student_dateofbirth, student_gender } =
            req.body;
        // Validation
        if (!student_fullname || student_gender == null || !student_dateofbirth)
            return res.status(400).json({
                success: false,
                message: "Please fill in complete information",
            });
        try {
            let updateStudent = {
                student_fullname,
                student_dateofbirth,
                student_gender,
                student_image: req.file.path,
            };
            const postUpdateCondition = {
                _id: req.params.id,
                user: req.userId,
            };
            const student = await Student.findById(req.params.id);
            fs.unlink("./" + student.student_image, (err) => {
                if (err)
                    res.status(400).json({
                        success: false,
                        message: "Image error: " + err,
                    });
                console.log("successfully deleted file");
            });
            updatedStudent = await Student.findOneAndUpdate(
                postUpdateCondition,
                updateStudent,
                { new: true }
            );

            if (!updateStudent)
                return res
                    .status(401)
                    .json({ success: false, message: "Student is not found" });
            res.json({
                success: true,
                message: "Update succesfully!",
                studentFullName: updatedStudent.student_fullname,
                studentDateOfBirth: updatedStudent.student_dateofbirth,
                studentGender: updatedStudent.student_gender,
                studentImage: updatedStudent.student_image,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        } 
    }
);

// @route DELETE dashboard/teacher/delete-student
// @desc delete student
// @access Private
router.delete("/:id", verifyJWTandTeacher, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId };
        const deleteStudent = await Student.findOneAndDelete(
            postDeleteCondition
        );
        if (!deleteStudent) {
            return res
                .status(401)
                .json({ success: false, message: "Student not found!" });
        }
        res.json({ success: true, message: "Delete succesfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});
module.exports = router;
