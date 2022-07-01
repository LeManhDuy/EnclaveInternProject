const express = require('express')
const router = express.Router()
const { authTeacher } = require('../middleware/verifyRoles')
const verifyJWT = require('../../server/middleware/verifyJWT')
const Student = require('../model/Student')
const Class = require('../model/Class')
// @route GET dashboard/teacher/create-student
// @desc create student information
// @access Private
router.post('/create-student', verifyJWT, authTeacher("Teacher"), async (req, res) => {
    const { student_fullname, student_age, student_gender, student_image, student_behavior } = req.body
    //Simple validation
    if (!student_fullname || !student_age || !student_gender || !student_image || !student_behavior)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        const newStudent = new Student({
            student_fullname, student_age, student_gender, student_image, student_behavior, teacher_id: req.userId,
        })
        await newStudent.save()
        res.json({ success: true, message: 'Create student successfully', student: newStudent })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route GET dashboard/teacher/create-class
// @desc create class
// @access Private
router.post('/create-class', verifyJWT, authTeacher("Teacher"), async (req, res) => {
    const { class_name } = req.body
    //Simple validation
    if (!class_name)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        const newClass = new Class({ class_name })
        await newClass.save()
        res.json({ success: true, message: 'Create class successfully', class: newClass })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

module.exports = router