const express = require('express')
const router = express.Router()
const { authTeacher } = require('../middleware/verifyRoles')
const verifyJWT = require('../../server/middleware/verifyJWT')
const Student = require('../model/Student')
const Class = require('../model/Class')
// @route GET api/dashboard/teacher
// @desc create student information
// @access Private
router.post('/teacher', verifyJWT, authTeacher("Teacher"), async (req, res) => {
    const { student_fullname, student_age, student_gender, student_image, student_behavior } = req.body
    //Simple validation
    if (!student_fullname || !student_age || !student_gender || !student_image || !student_behavior)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        const newStudent = new Student({
            student_fullname, student_age, student_gender, student_image, student_behavior, teacher_id : req.userId, 
        })
        await newStudent.save()
        res.json({ success: true, message: 'Create student successfully', student: newStudent })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

module.exports = router