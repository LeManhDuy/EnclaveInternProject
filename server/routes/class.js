require('dotenv').config()
const express = require('express')
const router = express.Router()
const verifyJWTandTeacher = require('../middleware/verifyJWTandTeacher')
const Class = require('../model/Class')
const Teacher = require('../model/Teacher')
const Grade = require('../model/Grade')

// @route POST dashboard/teacher/class/create-class
// @desc create class
// @access Private
router.post('/create-class', verifyJWTandTeacher, async (req, res) => {
    const {
        class_name,
        teacher_email,
        grade_name,
    } = req.body
    //Simple validation
    const clas = await Class.findOne({ class_name: class_name })
    const grade = await Grade.findOne({ grade_name: grade_name })
    const teacher = await Teacher.findOne({ teacher_email: teacher_email })
    if (clas) {
        return res.status(400).json({ success: false, message: "Class is existing!" })
    }
    if (!teacher || !grade) {
        return res.status(404).json({ success: false, message: "Teacher or grade is not existing!" })
    }
    if (!class_name)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        const newClass = new Class({
            class_name,
            teacher_id: teacher,
            grade_id: grade
        })
        await newClass.save()
        res.json({ success: true, message: 'Create class successfully', class: newClass })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route POST dashboard/teacher/class/create-class-for-student-id
// @desc create class
// @access Private
router.post('/create-class-for-student-id/:studentID&:classID', verifyJWTandTeacher, async (req, res) => {
    const { studentID, classID } = req.params
    const {
        class_name,
        student_id,
    } = req.body
    //Simple validation
    const classValidate =await Class.findOne({ class_id: class_id })
    const grade = await Grade.findOne({ grade_name: grade_name })
    const teacher = await Teacher.findOne({ teacher_email: teacher_email })
    if (clas) {
        return res.status(400).json({ success: false, message: "Class is existing!" })
    }
    if (!teacher || !grade) {
        return res.status(404).json({ success: false, message: "Teacher or grade is not existing!" })
    }
    if (!class_name)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        const newClass = new Class({
            class_name,
            teacher_id: teacher,
            grade_id: grade
        })
        await newClass.save()
        res.json({ success: true, message: 'Create class successfully', class: newClass })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route GET dashboard/teacher/class
// @desc get class
// @access Private
router.get('/', async (req, res) => {
    try {
        const allClasses = await Class.find({})
        res.json({ success: true, allClasses })
    } catch (e) {
        return res.status(500).json({ success: false, message: e })
    }
})


// @route PUT dashboard/teacher/class
// @desc update class
// @access Private
router.put('/:id', async (req, res) => {
    const {
        class_name,
        grade_name,
        teacher_email
    } = req.body
    const clas = await Class.findById(req.params.id)
    const grade = await Grade.findOne({ grade_name: grade_name })
    const teacher = await Teacher.findOne({ teacher_email: teacher_email })
    if (!teacher || !grade || !clas) {
        return res.status(404).json({ success: false, message: "Teacher or grade is not existing!" })
    }
    if (!class_name) {
        return res.status(400).json({ success: false, message: "Missing information. Please fill in!" })
    }
    try {
        let updateClass = {
            class_name,
            teacher_id: teacher,
            grade_id: grade
        }
        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        updatedClass = await Class.findOneAndUpdate(postUpdateCondition, updateClass, { new: true })
        if (!updateClass) {
            return res.status(401).json({ success: false, message: "Class not found" })
        }
        dbClass = await Class.findById(req.params.id)
        res.json({ success: true, message: 'Updated!', class: updateClass, dbClass: dbClass })
    } catch (e) {
        return res.status(500).json({ success: false, message: e })
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