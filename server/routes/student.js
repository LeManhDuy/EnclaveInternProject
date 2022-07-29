require("dotenv").config();
const express = require("express");
const router = express.Router();
const verifyJWTandTeacher = require("../middleware/verifyJWTandTeacher");
const verifyJWTandAdmin = require("../middleware/verifyJWTandAdmin");
const Student = require("../model/Student");
const Teacher = require("../model/Teacher");
const Class = require("../model/Class");
const Parent = require("../model/Parents");
const Score = require("../model/Score");
const SummaryScore = require("../model/SummaryScore");
const Protector = require("../model/Protector");
const Subject = require("../model/Subject");
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
  verifyJWTandAdmin,
  upload.single("student_image"),
  async (req, res) => {
    const { classID, parentID } = req.params;
    const { student_fullname, student_gender, student_dateofbirth } = req.body;
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
        message: "Create student suctcessfully",
        studentFullName: newStudent.student_fullname,
        studentDateOfBirth: newStudent.student_dateofbirth,
        studentGender: newStudent.student_gender,
        studentImage: newStudent.student_image,
        classInfor : classInfor.teacher_name,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "" + error });
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

router.get("/get-student-by-id/:studentID", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentID)
      .populate("class_id", ["class_name", ["teacher_name"]])
      .select([
        "student_fullname",
        "student_gender",
        "student_image",
        "student_dateofbirth",
        "parent_id",
        "class_id",
      ]);
    return res.status(200).json({
      student,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "" + error });
  }
});

// @route GET dashboard/teacher/get-all-student
// @desc get student information
// @access Private
router.get("/get-all-student/", async (req, res) => {
  try {
    // Return token
    const allStudent = await Student.find({})
      .populate("class_id", ["class_name", ["teacher_name"]])
      .populate("parent_id", ["parent_name"])
      .populate("subjects", ["subject_name"])
      .populate("summary", ["summary_score", "summary_behavior"])
      .select(["student_fullname", "student_gender", "student_image"]);
    return res.status(200).json({
      StudentInformation: allStudent,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "" + error });
  }
});

// @route GET dashboard/teacher/parent-get-student-information
// @desc parent get student information
// @access Private
router.get("/get-student-information/:studentID", async (req, res) => {
  const { studentID } = req.params;
  try {
    // Return token
    //sutdent
    const getStudentById = await Student.findById(studentID)
      .populate("class_id", ["class_name"])
      .populate("parent_id", [
        "parent_name",
        "parent_address",
        "parent_phone",
        "parent_email",
        "parent_job",
        "parent_gender",
        "parent_img",
      ]);
    if (!getStudentById)
      return res
        .status(401)
        .json({ success: false, message: "Student is not found!" });

    const parent = await Parent.findById(getStudentById.parent_id)

    const arrProtectorId = [];
    parent.protectors.map((item) => {
      arrProtectorId.push(item._id);
    });
    const getProtector = await Protector.find({ _id: arrProtectorId })
      .select(["protector_name", "protector_address", "protector_phone", "protector_relationship", "protector_img"]);
    return res.status(200).json({
      studentImage: getStudentById.student_image,
      studentFullName: getStudentById.student_fullname,
      studentDateOfBirth: getStudentById.student_dateofbirth,
      studentGender: getStudentById.student_gender,
      className: getStudentById.class_id.class_name,
      ParentName: getStudentById.parent_id.parent_name,
      ParentPhone: getStudentById.parent_id.parent_phone,
      studentAddress: getStudentById.parent_id.parent_address,
      ParentEmail: getStudentById.parent_id.parent_email,
      ParentJob: getStudentById.parent_id.parent_job,
      ParentGender: getStudentById.parent_id.parent_gender,
      ParentImg: getStudentById.parent_id.parent_img,
      ProtectorInformation: getProtector
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
      return res.status(500).json({ success: false, message: "" + error });
    }
  }
);

// @route PUT dashboard/teacher/update-student
// @desc Update stduent
// @access Private Only Admin
router.put(
  "/:studentID&:parentID&:classID",
  verifyJWTandAdmin,
  upload.single("student_image"),
  async (req, res) => {
    const { student_fullname, student_dateofbirth, student_gender } =
      req.body;
    const { studentID, parentID, classID } = req.params;
    const parent = await Parent.findById(parentID)
    const classDB = await Class.findById(classID)
    if (!classDB)
      return res.status(404).json({
        success: false,
        message: "Class is not existing!",
      });
    if (!parent)
      return res.status(404).json({
        success: false,
        message: "Parent is not existing!",
      });
    // Validation
    if (!student_fullname || student_gender == null || !student_dateofbirth)
      return res.status(400).json({
        success: false,
        message: "Please fill in complete information",
      });
    let student_image = null;
    if (req.file) {
      student_image = req.file.path;
    }
    try {
      const student = await Student.findById(req.params.studentID);
      if (student.parent_id) {
        const parentOld = await Parent.findById(student.parent_id.toString())
        parentOld.children.remove(student._id.toString())
        parentOld.save()
      }
      if (student.class_id) {
        const classOld = await Class.findById(student.class_id.toString())
        classOld.students.remove(student._id.toString())
        classOld.save()
      }
      if (student.student_image) {
        if (student_image === null) {
          student_image = student.student_image;
        } else {
          fs.unlink("./" + student.student_image, (err) => {
            if (err)
              res.status(400).json({
                success: false,
                message: "Image error: " + err,
              });
            console.log("successfully deleted file");
          });
        }
      }
      let updateStudent = {
        student_fullname,
        student_dateofbirth,
        student_gender,
        student_image,
        parent_id: parentID,
        class_id: classID,
      };
      const postUpdateCondition = {
        _id: req.params.studentID,
        user: req.userId,
      };
      updatedStudent = await Student.findOneAndUpdate(
        postUpdateCondition,
        updateStudent,
        { new: true }
      );
      parent.children.push(student)
      parent.save()
      classDB.students.push(student)
      classDB.save()
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
      return res.status(500).json({ success: false, message: "" + error });
    }
  }
);

// @route DELETE dashboard/teacher/delete-student
// @desc delete student
// @access Private
router.delete("/:id", verifyJWTandAdmin, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id };
    const studentDB = await Student.findById(postDeleteCondition._id);
    if (!studentDB) {
      return res
        .status(401)
        .json({ success: false, message: "Student not found!" });
    }
    if (studentDB.student_image) {
      fs.unlink("./" + studentDB.student_image, (err) => {
        if (err)
          res.status(400).json({
            success: false,
            message: "Image error: " + err,
          });
        console.log("successfully deleted file");
      });
    }
    if (studentDB.parent_id) {
      const parent = await Parent.findById(
        studentDB.parent_id.toString()
      );
      if (!parent) {
        return res.status(401).json({
          success: false,
          message: "Parent not found",
        });
      }
      parent.children.remove(studentDB._id.toString())
      parent.save();
    }
    if (studentDB.class_id) {
      const classId = await Class.findById(studentDB.class_id.toString());
      if (!classId) {
        return res.status(401).json({
          success: false,
          message: "Class not found",
        });
      }
      classId.students = undefined;
      classId.save();
    }

    if (studentDB.subjects) {
      studentDB.subjects.map(async (item) => {
        let subject = await Subject.findById(item._id.toString());
        if (subject) {
          subject.students = undefined;
          subject.save();
        }
      });
    }

    if (studentDB.scores) {
      studentDB.scores.map(async (item) => {
        let score = await Score.findById(item._id.toString());
        if (score) {
          const deleteScore = await Score.findOneAndDelete(score._id);
        }
      });
    }

    if (studentDB.summary) {
      const summary = await SummaryScore.findById(studentDB.summary.toString());
      if (!summary) {
        return res.status(401).json({
          success: false,
          message: "Summary score not found",
        });
      }
      const deleteSummaryScore = await SummaryScore.findOneAndDelete(
        summary._id
      );
      console.log(deleteSummaryScore);
    }

    const deleteStudent = await Student.findOneAndDelete(postDeleteCondition);
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
