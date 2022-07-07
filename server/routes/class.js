require('dotenv').config()
const express = require('express')
const router = express.Router()
const {authTeacher} = require('../middleware/verifyRoles')
const verifyJWT = require('../../server/middleware/verifyJWTandTeacher')
const Class = require('../model/Class')
const Teacher = require('../model/Teacher')
const Grade = require('../model/Grade')
const Student = require('../model/Student')


// add student and teacher to class
router.get('/add-student-to-class/class=:classId&student=:studentId&teacher=:teacherId', async (req, res) => {
    const {
        classId,
        studentId,
        teacherId
    } = req.params

    try {
        //validate
        let clas = await Class.findOne(classId._id)
            .populate('students', ['student_fullname'])
            .populate('grade_id', ['grade_name'])
        let student = await Student.findById(studentId)
        let teacher = await Teacher.findById(teacherId)
        var result = false
        clas.students.map(item => {
            console.log({student: studentId, item: item._id.toString()})
            if (studentId === item._id.toString()) {
                result = true
                console.log(result)
                return result
            }
        })
        console.log(result)

        if (!teacher) {
            return res.status(400).json({success: false, message: 'This teacher does not exists.'})
        }
        if (!student) {
            return res.status(400).json({success: false, message: 'This student does not exists.'})
        }
        if (result) {
            return res.status(400).json({success: false, message: 'This student is already in this class'})
        }

        teacher.teacher_class = clas._id
        student.class = clas._id
        clas.students.push(student._id)
        await teacher.save()
        await student.save()
        await clas.save()

        return res.json({
            success: true,
            message: 'Add student and teacher to class successfully',
            class: clas.class_name,
            grade: clas.grade_id,
            teacher: teacher.teacher_name,
            students: clas.students
        })
    } catch (error) {
        return res.status(500).json({success: false, message: '' + error})
    }
})


// @route POST dashboard/teacher/class
// @desc create class
// @access Private
// router.post('/', verifyJWT, authTeacher("Teacher"), async (req, res) => {
router.post('/:gradeId&:teacherId', verifyJWT, async (req, res) => {
    const {gradeId, teacherId} = req.params
    console.log({grade: gradeId, teacher: teacherId})
    const {
        class_name,
    } = req.body
    //Simple validation
    const clas = await Class.findOne({class_name: class_name})
    const gradeValidate = await Class.findById(gradeId)
    const teacherValidate = await Class.findById(gradeId)
    const grade = await Grade.findById(gradeId)
    const teacher = await Teacher.findById(teacherId)
    if (clas && gradeValidate) {
        return res.status(400).json({success: false, message: "Class is existing in this grade!"})
    }
    if (clas && teacherValidate) {
        return res.status(400).json({success: false, message: "class is owning by this teacher"})
    }
    if (!teacher || !grade) {
        return res.status(404).json({success: false, message: "Teacher or grade is not existing!"})
    }
    if (!class_name)
        return res.status(400).json({success: false, message: 'Please fill in complete information'})
    try {
        const newClass = new Class({
            class_name,
            teacher_id: teacher,
            grade_id: grade
        })
        await newClass.save()
        grade.classes.push(newClass._id)
        await grade.save()
        teacher.teacher_class = newClass._id
        await teacher.save()
        res.json({success: true, message: 'Create class successfully', class: newClass})
    } catch (error) {
        return res.status(500).json({success: false, message: '' + error})
    }
})

// @route GET dashboard/teacher/class
// @desc get class
// @access Private
router.get('/', async (req, res) => {
    try {
        const allClasses = await Class.find({})
        res.json({success: true, allClasses})
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})


// @route GET dashboard/teacher/class
// @desc get class from grade
// @access Private
router.get('/grade/:gradeId', async (req, res) => {
    const {gradeId} = req.params

    try {
        const grade = await Grade.findById(gradeId).populate('classes')
        return res.json({grade_name: grade.grade_name, classes: grade.classes})
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})


// @route GET dashboard/teacher/class
// @desc get class from teacher
// @access Private
router.get('/teacher/:teacherId', async (req, res) => {
    const {teacherId} = req.params

    try {
        const teacher = await Teacher.findById(teacherId).populate('teacher_class')
        return res.json({teacher_name: teacher.teacher_name, classes: teacher.teacher_class})
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})

// @route PUT dashboard/teacher/class
// @desc update class
// @access Private
router.put('/:id&:gradeId&:teacherId', async (req, res) => {
    const {
        gradeId,
        teacherId
    } = req.params
    const {
        class_name,
    } = req.body
    const clas = await Class.findById(req.params.id)
    const grade = await Grade.findById(gradeId)
    const teacher = await Teacher.findById(teacherId)
    if (!teacher || !grade || !clas) {
        return res.status(404).json({success: false, message: "Teacher or grade is not existing!"})
    }
    if (!class_name) {
        return res.status(400).json({success: false, message: "Missing information. Please fill in!"})
    }
    try {
        let old_teacher_id = clas.teacher_id
        let old_grade_id = clas.teacher_id

        const updateClass = new Class({
            class_name,
            // teacher_id: teacher,
            // grade_id: grade
        })
        const postUpdateCondition = {_id: req.params.id, user: req.userId}

        updatedClass = await Class.findOneAndUpdate(postUpdateCondition, updateClass, {new: true})
        console.log("day la update")

        // let old_teacher = await Teacher.findById(old_teacher_id)
        // let old_grade = await Grade.findById(old_grade_id)

        // try {
        //     old_grade.classes = old_grade.classes.filter((c)=>{
        //         return c !== updateClass._id
        //     })
        //     old_teacher.teacher_class = null
        // } catch (e) {
        //     return res.status(403).json({success:false, message:e})
        // }
        // grade.classes.push(updateClass._id)
        // await grade.save()
        //
        // teacher.teacher_class = updateClass._id
        // await teacher.save()
        // try {
        //     grade.classes.push(updateClass._id)
        //     await grade.save()
        //
        //     teacher.teacher_class = updateClass._id
        //     await teacher.save()
        // } catch (e) {
        //     return res.status(403).json({success:false, message:e})
        // }

        if (!updateClass) {
            return res.status(401).json({success: false, message: "Class not found"})
        }
        dbClass = await Class.findById(req.params.id)
        res.json({success: true, message: 'Updated!', class: updateClass, dbClass: dbClass})
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})

// @route DELETEdashboard/teacher/class
// @desc delete class
// @access Private
router.delete('/:id', async (req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const deleteClass = await Class.findOneAndDelete(postDeleteCondition)

        if (!deleteClass) {
            return res.status(401).json({success: false, message: "Class not found!"})
        }

        res.json({success: true, message: "Deleted!"})
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})

module.exports = router