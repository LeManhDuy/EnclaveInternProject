require("dotenv").config();
const express = require("express");
const router = express.Router();
const { authTeacher } = require("../middleware/verifyRoles");
const verifyJWT = require("../../server/middleware/verifyJWTandAdmin");
const Class = require("../model/Class");
const Teacher = require("../model/Teacher");
const Grade = require("../model/Grade");
const Student = require("../model/Student");
const Schedule = require("../model/Schedule");

// @route GET dashboard/teacher/class/add-teacher-to-class/{{ classId }}&{{ teacherId }}
// @desc add student to class
// @access Private
router.get(
    "/add-teacher-to-class/:classId&:teacherId",
    verifyJWT,
    async (req, res) => {
        const { classId, teacherId } = req.params;

        try {
            //validate
            let classDB = await Class.findById(classId);
            if (!classDB)
                return res.status(400).json({
                    success: false,
                    message: "This class does not exists.",
                });
            if (classDB.teacher_id) {
                return res.status(400).json({
                    success: false,
                    message: "This class already have a teacher.",
                });
            }
            let teacher = await Teacher.findById(teacherId);
            if (!teacher) {
                return res.status(400).json({
                    success: false,
                    message: "This teacher does not exists.",
                });
            }
            if (teacher.teacher_class) {
                return res.status(400).json({
                    success: false,
                    message: "This teacher already have a class",
                });
            }
            teacher.teacher_class = classDB;
            classDB.teacher_id = teacher;
            await teacher.save();
            await classDB.save();
            const showClass = await Class.findById(classId)
                .populate("students", ["student_fullname"])
                .populate("grade_id", ["grade_name"])
                .populate("teacher_id", ["teacher_name"])
                .populate("schedule_id", ["schedule_link"]);
            return res.json({
                success: true,
                message: "Add teacher to class successfully",
                class: classDB.class_name,
                grade: showClass.grade_id,
                teacher: showClass.teacher_id,
                schedule: showClass.schedule_id,
                students: showClass.students,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        }
    }
);

// @route GET dashboard/teacher/class/add-schedult-to-class/{{ classId }}&{{ scheduleId }}
// @desc add student to class
// @access Private
router.get(
    "/add-schedule-to-class/:classId&:scheduleId",
    verifyJWT,
    async (req, res) => {
        const { classId, scheduleId } = req.params;

        try {
            //validate
            let classDB = await Class.findById(classId);
            if (!classDB)
                return res.status(400).json({
                    success: false,
                    message: "This class does not exists.",
                });
            if (classDB.schedule_id)
                return res.status(400).json({
                    success: false,
                    message: "This class already have a schedule.",
                });
            let schedule = await Schedule.findById(scheduleId);
            if (!schedule) {
                return res.status(400).json({
                    success: false,
                    message: "This schedule does not exists.",
                });
            }
            if (schedule.class_id) {
                return res.status(400).json({
                    success: false,
                    message: "This schedule is already used",
                });
            }
            schedule.class_id = classDB;
            classDB.schedule_id = schedule;
            await schedule.save();
            await classDB.save();
            const showClass = await Class.findById(classId)
                .populate("students", ["student_fullname"])
                .populate("grade_id", ["grade_name"])
                .populate("teacher_id", ["teacher_name"])
                .populate("schedule_id", ["schedule_link"]);
            return res.json({
                success: true,
                message: "Add schedule to class successfully",
                class: classDB.class_name,
                grade: showClass.grade_id,
                teacher: showClass.teacher_id,
                schedule: showClass.schedule_id,
                students: showClass.students,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        }
    }
);

// @route GET dashboard/teacher/class/add-student-to-class/{{ classId }}&{{ studentId }}
// @desc add student to class
// @access Private
router.get(
    "/add-student-to-class/:classId&:studentId",
    verifyJWT,
    async (req, res) => {
        const { classId, studentId } = req.params;

        try {
            //validate
            let classDB = await Class.findById(classId);
            let student = await Student.findById(studentId);
            let result = false;
            classDB.students.map((item) => {
                console.log({ student: studentId, item: item._id.toString() });
                if (studentId === item._id.toString()) {
                    result = true;
                    return result;
                }
            });
            if (!student) {
                return res.status(400).json({
                    success: false,
                    message: "This student does not exists.",
                });
            }
            if (result) {
                return res.status(400).json({
                    success: false,
                    message: "This student is already in this class",
                });
            }
            if (student.class_id)
                return res.status(400).json({
                    success: false,
                    message: "This student is already in another class",
                });
            student.class_id = classDB._id;
            classDB.students.push(student._id);
            await student.save();
            await classDB.save();
            const showClass = await Class.findById(classId)
                .populate("students", ["student_fullname"])
                .populate("grade_id", ["grade_name"])
                .populate("teacher_id", ["teacher_name"])
                .populate("schedule_id", ["schedule_link"]);
            return res.json({
                success: true,
                message: "Add student to class successfully",
                class: classDB.class_name,
                grade: showClass.grade_id,
                teacher: showClass.teacher_id,
                schedule: showClass.schedule_id,
                students: showClass.students,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        }
    }
);

// @route POST dashboard/teacher/class/{{ gradeId }}&{{ teacherId }}&{{ scheduleId }}
// @desc create class
// @access Private
// router.post('/:gradeId&:teacherId', verifyJWT, async (req, res) => {
router.post("/:gradeId&:teacherId&:scheduleId", verifyJWT, async (req, res) => {
    const { gradeId, teacherId, scheduleId } = req.params;
    const { class_name } = req.body;
    //Simple validation
    const classDB = await Class.findOne({
        class_name: class_name,
        teacher_id: teacherId,
        grade_id: gradeId,
    });
    const grade = await Grade.findById(gradeId);
    const teacher = await Teacher.findById(teacherId);
    if (!teacher || !grade) {
        return res.status(404).json({
            success: false,
            message: "Teacher or grade is not existing!",
        });
    }
    if (classDB) {
        return res.status(400).json({
            success: false,
            message: "The class already exists!",
        });
    }
    if (teacher.teacher_class) {
        return res.status(400).json({
            success: false,
            message: "class is owning by this teacher",
        });
    }
    if (scheduleId) {
        const schedule = Schedule.findById(scheduleId);
        if (schedule.class_id)
            return res.status(400).json({
                success: false,
                message: "The class already have a schedule!",
            });
    }
    if (!class_name)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information",
        });
    try {
        const newClass = new Class({
            class_name,
            teacher_id: teacher,
            grade_id: grade,
            teacher_name: teacher.teacher_name,
            grade_name: grade.grade_name,
        });
        await newClass.save();
        grade.classes.push(newClass._id);
        await grade.save();
        teacher.teacher_class = newClass._id;
        await teacher.save();
        res.json({
            success: true,
            message: "Create class successfully",
            class: newClass.class_name,
            teacher: teacher.teacher_name,
            grade: grade.grade_name,
            schedule: schedule.schedule_link,
            grade_name: grade.grade_name,
            teacher_name: teacher.teacher_name,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "" + error,
        });
    }
});

// @route GET dashboard/teacher/class
// @desc get class
// @access Private
router.get("/", verifyJWT, async (req, res) => {
    try {
        const allClasses = await Class.find({});
        res.json({ success: true, allClasses });
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
});

// @route GET dashboard/teacher/class/grade/{{ gradeId }}
// @desc get class from grade
// @access Private
router.get("/grade/:gradeId", verifyJWT, async (req, res) => {
    const { gradeId } = req.params;

    try {
        const grade = await Grade.findById(gradeId).populate("classes");
        return res.json({
            grade_id: grade._id,
            grade_name: grade.grade_name,
            classes: grade.classes,
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
});

// @route GET dashboard/teacher/class/teacher/{{ teacherId }}
// @desc get class from teacher
// @access Private
router.get("/teacher/:teacherId", verifyJWT, async (req, res) => {
    const { teacherId } = req.params;

    try {
        const teacher = await Teacher.findById(teacherId).populate(
            "teacher_class"
        );
        return res.json({
            teacher_name: teacher.teacher_name,
            classes: teacher.teacher_class,
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
});

// @route PUT dashboard/teacher/class/{{ class_id }}
// @desc update class
// @access Private
router.put("/:id", verifyJWT, async (req, res) => {
    const { id } = req.params;
    const { class_name } = req.body;
    const classDB = await Class.findById(id);
    if (!classDB)
        return res.status(404).json({
            success: false,
            message: "Class is not existing!",
        });
    if (!class_name) {
        return res.status(400).json({
            success: false,
            message: "Missing information. Please fill in!",
        });
    }
    try {
        const updateClass = {
            class_name,
        };
        const classUpdateCondition = { id, user: req.userId };
        updatedClass = await Class.findOneAndUpdate(
            classUpdateCondition,
            updateClass,
            { new: true }
        );
        if (!updateClass) {
            return res.status(401).json({
                success: false,
                message: "Class not found",
            });
        }
        dbClass = await Class.findById(req.params.id);
        res.json({
            success: true,
            message: "Updated!",
            class: updateClass.class_name,
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
});

// @route DELETE dashboard/teacher/class/{{ class_id }}
// @desc delete class
// @access Private
router.delete("/:id", verifyJWT, async (req, res) => {
    try {
        const classDeleteCondition = { _id: req.params.id, user: req.userId };
        const classDB = await Class.findById(classDeleteCondition._id);
        if (!classDB) {
            return res.status(401).json({
                success: false,
                message: "Class not found",
            });
        }
        const teacher = await Teacher.findById(classDB.teacher_id.toString());
        if (!teacher) {
            return res.status(401).json({
                success: false,
                message: "Teacher not found",
            });
        }
        teacher.class_id = undefined;
        const grade = await Grade.findById(classDB.grade_id.toString());
        if (!grade) {
            return res.status(401).json({
                success: false,
                message: "Student not found",
            });
        }
        grade.classes.pop(classDB._id);
        grade.save();
        const deleteClass = await Class.findOneAndDelete(classDeleteCondition);
        classDB.students.map(async (item) => {
            let student = await Student.findById(item._id.toString());
            student.class_id = undefined;
            student.save();
        });
        teacher.save();
        if (!deleteClass) {
            return res
                .status(401)
                .json({ success: false, message: "Class not found!" });
        }
        res.json({ success: true, message: "Deleted!" });
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
});

module.exports = router;
