require('dotenv').config()
const express = require('express')
const router = express.Router()
const { authTeacher } = require('../middleware/verifyRoles')
const verifyJWT = require('../middleware/verifyJWTandTeacher')
const Class = require('../model/Class')
const Teacher = require('../model/Teacher')
const Grade = require('../model/Grade')

// @route POST dashboard/teacher/class
// @desc create class
// @access Private
// router.post('/', verifyJWT, authTeacher("Teacher"), async (req, res) => {
router.post('/:gradeId&:teacherId', verifyJWT, async (req, res) => {
    const { gradeId, teacherId } = req.params
    console.log({grade: gradeId, teacher: teacherId})
    const {
        class_name,
    } = req.body
    //Simple validation
    const clas = await Class.findOne({ class_name: class_name})
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
        return res.status(400).json({ success: false, message: "Missing information. Please fill in!" })
    }
    try {
        let old_teacher_id = clas.teacher_id
        let old_grade_id = clas.teacher_id

        const updateClass = new Class({
            class_name,
            teacher_id:teacher,
            grade_id:grade
        })

        const postUpdateCondition = {_id:req.params.id, user: req.userId}

        updatedClass = await Class.findOneAndUpdate(postUpdateCondition, updateClass, { new: true })
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
        res.json({success: true, message: 'Updated!', class: updateClass, dbClass:dbClass})
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})

// @route DELETEdashboard/teacher/class
// @desc delete class
// @access Private
router.delete('/:id', async (req, res) => {
    try {
       // const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const postDeleteCondition = { _id: req.params, user: req.userId }
        const deleteClass = await Class.findOneAndDelete(postDeleteCondition)

        if (!deleteClass) {
            return res.status(401).json({ success: false, message: "Class not found!" })
        }

        res.json({ success: true, message: "Deleted!" })
    } catch (e) {
        return res.status(500).json({ success: false, message: e })
    }
})

module.exports = router