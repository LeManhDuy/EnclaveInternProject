const express = require("express");
const router = express.Router();
const Subjects = require("../model/Subject");
const Grades = require("../model/Grade");
const Student = require("../model/Student");
const { ObjectId } = require("mongodb");
// add subjects to grade id and student id
router.get(
    "/add-subjects-to-grade-and-student/:subjectID&:gradeID&:studentID",
    async (req, res) => {
        const { subjectID, gradeID, studentID } = req.params;
        try {
            //Validate
            const subject = await Subjects.findOne(subjectID._id);
            const grade = await Grades.findById(gradeID);
            const student = await Student.findById(studentID);
            var result = false;
            subject.students.map((item) => {
                if (studentID === item.toString()) {
                    result = true;
                    return result;
                }
            });
            console.log(result);

            //Validate
            if (!grade) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "This grade does not exists.",
                    });
            }
            if (!student) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "This student does not exists.",
                    });
            }
            if (result) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "This student is in this subject",
                    });
            }
            grade.subjects.push(subject._id);
            student.subjects.push(subject._id);
            subject.students.push(student._id);
            subject.students_name.push(student.student_fullname);
            await grade.save();
            await student.save();
            await subject.save();
            // let studentsDetail = []
            // subject.students.map(async item => {
            //     const detailStudent = await Student.findById(item)
            //     console.log(detailStudent.student_fullname);
            //     studentsDetail.push(detailStudent.student_fullname)
            //     console.log(studentsDetail);
            // })
            return res.json({
                success: true,
                message: "Add student to subject successfully",
                subject_name: subject.subject_name,
                subject_ratio: subject.subject_ratio,
                grade_id: gradeID,
                grade_name: grade.grade_name,
                students: subject.students_name,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        }
    }
);

//create subject
// Create
router.post("/create-subject/:gradeID", async (req, res) => {
    const { gradeID } = req.params;
    const { subject_name, subject_ratio, grade_id } = req.body;
    if (!subject_name || !subject_ratio) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Missing information.Please fill in!",
            });
    }
    try {
        //Validate
        const subjectValidate = await Subjects.findOne({
            subject_name: subject_name,
        });
        const gradeValidate = await Grades.findOne({ grade_id: grade_id });
        const grade = await Grades.findById(gradeID);
        if (subjectValidate && gradeValidate) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "This subject is existing in this grade.",
                });
        }
        if (!grade) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "This grade does not exists.",
                });
        }
        const newSubject = new Subjects({
            subject_name,
            subject_ratio,
            grade_id: grade,
        });
        await newSubject.save();
        grade.subjects.push(newSubject._id);
        await grade.save();
        res.json({
            success: true,
            message: "Create subject successfully",
            subjects: newSubject,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Get
router.get("/", async (req, res) => {
    try {
        // Return token
        const allSubjects = await Subjects.find({});
        res.json({ success: true, allSubjects });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// // Get student from subject
// router.get('/:subjectID', async (req, res) => {
//     const { subjectID } = req.params
//     try {
//         // Return token
//         const allStudents = await Student.find({})
//         res.json({ success: true, allSubjects })
//     } catch (error) {
//         return res.status(500).json({ success: false, message: '' + error })
//     }

// })

// Get subjects from grade
router.get("/:gradeID", async (req, res) => {
    const { gradeID } = req.params;

    try {
        const grade = await Grades.findById(gradeID).populate("subjects");
        return res
            .status(200)
            .json({ grade_name: grade.grade_name, subjects: grade.subjects });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Get subject from student
router.get("/get-subject-by-id/:studentID", async (req, res) => {
    const { studentID } = req.params;
    try {
        const student = await Student.findById(studentID).populate("subjects");
        console.log(student);
        return res
            .status(200)
            .json({
                student_name: student.student_fullname,
                subjects: student.subjects,
            });
    } catch (error) {
        return res.status(500).json({ success: false, message: "1 " + error });
    }
});

// Update
router.put("/:id", async (req, res) => {
    const { subject_name, subject_ratio, grade_id } = req.body;
    // Validation
    if (!subject_name || !subject_ratio || !grade_id) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Missing information.Please fill in!",
            });
    }
    try {
        let updateSubject = {
            subject_name,
            subject_ratio,
            grade_id,
        };
        const postUpdateCondition = { _id: req.params.id };
        updatedSubject = await Subjects.findOneAndUpdate(
            postUpdateCondition,
            updateSubject,
            { new: true }
        );

        if (!updatedSubject)
            return res
                .status(401)
                .json({ success: false, message: "Subject not found" });
        res.json({ success: true, message: "Updated!", parent: updateParent });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Delete
router.delete("/:id", async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id };
        const deletedSubject = await Subjects.findOneAndDelete(
            postDeleteCondition
        );

        if (!deletedSubject)
            return res
                .status(401)
                .json({ success: false, message: "Subject not found" });
        res.json({
            success: true,
            message: "Deleted!",
            subject: deletedSubject,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;

// router.post('/create-subjects/:gradeID&:studentID', async (req, res) => {
//     const { gradeID, studentID } = req.params
//     const {
//         subject_name,
//         subject_ratio,
//         grade_id,
//         student_id,
//     } = req.body
//     if (!subject_name || !subject_ratio) {
//         return res.status(400).json({ success: false, message: 'Missing information.Please fill in!' })
//     }
//     try {
//         //Validate
//         const subjectValidate = await Subjects.findOne({ subject_name: subject_name })
//         const gradeValidate = await Grades.findOne({ grade_id: grade_id })
//         const grade = await Grades.findById(gradeID)
//         const student = await Student.findById(studentID)
//         if (subjectValidate && gradeValidate) {
//             console.log(subjectValidate)
//             return res.status(400).json({ success: false, message: 'This subject is existing in this grade.' })
//         }
//         if (!grade) {
//             return res.status(400).json({ success: false, message: 'This grade does not exists.' })
//         }
//         if (!student) {
//             return res.status(400).json({ success: false, message: 'This student does not exists.' })
//         }
//         const newSubject = new Subjects({
//             subject_name,
//             subject_ratio,
//             grade_id: grade,
//             student_id: student,
//         })
//         await newSubject.save()
//         grade.subjects.push(newSubject._id)
//         student.subjects.push(newSubject._id)
//         await grade.save()
//         await student.save()
//         res.json({ success: true, message: 'Create subject successfully', subjects: newSubject })
//     } catch (error) {
//         return res.status(500).json({ success: false, message: '' + error })
//     }
// })
