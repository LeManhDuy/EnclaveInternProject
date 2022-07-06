require('dotenv').config()
const express = require('express')
const router = express.Router()
const verifyJWTandTeacher = require('../middleware/verifyJWTandTeacher')
const Student = require('../model/Student')
const { ObjectId } = require('mongodb');

// @route GET dashboard/teacher/create-student
// @desc create student information
// @access Private
router.post('/create-student', verifyJWTandTeacher, async (req, res) => {
    const { student_fullname, student_age, student_gender, student_image, student_behavior, class_id, score_id, schoolyear_id } = req.body
    //Simple validation
    if (!student_fullname || !student_age || student_gender == null || !student_image || !student_behavior || !class_id || !score_id || !schoolyear_id)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        //save collection
        const newStudent = new Student({
            student_fullname,
            student_age,
            student_gender,
            student_image,
            student_behavior,
            teacher_id: req.userId,
            class_id: ObjectId(class_id),
            score_id: ObjectId(score_id),
            schoolyear_id: ObjectId(schoolyear_id)
        })
        await newStudent.save()
        res.json({ success: true, message: 'Create student successfully', student: newStudent })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route GET dashboard/teacher/get-all-student
// @desc get student information
// @access Private
router.get('/get-all-student', verifyJWTandTeacher, async (req, res) => {
    try {
        // Return token
        const allStudent = await Student.find({})
        res.json({ success: true, allStudent })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route GET dashboard/teacher/get-student-by-id
// @desc get student information by id
// @access Private
router.get('/get-student-by-id/:id', verifyJWTandTeacher, async (req, res) => {
    try {
        // Return token
        studentId = req.params.id
        const getStudentById = await Student.findById(ObjectId(studentId))
        if (!getStudentById)
            return res.status(401).json({ success: false, message: 'Student is not found!' })
        res.json({ success: true, getStudentById })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route PUT dashboard/teacher/update-student
// @desc Update stduent
// @access Private Only Admin
router.put('/update-student/:id', verifyJWTandTeacher, async (req, res) => {
    const {
        student_fullname,
        student_age,
        student_gender,
        student_image,
        student_behavior,
        class_id,
        score_id,
        schoolyear_id } = req.body
    // Validation
    if (!student_fullname || !student_age || student_gender == null || !student_image || !student_behavior || !class_id || !score_id || !schoolyear_id)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        let updateStudent = {
            student_fullname,
            student_age,
            student_gender,
            student_image,
            student_behavior,
            class_id,
            score_id,
            schoolyear_id
        }
        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        updatedParent = await Student.findOneAndUpdate(postUpdateCondition, updateStudent, { new: true })

        if (!updateStudent)
            return res.status(401).json({ success: false, message: 'Student is not found' })
        res.json({ success: true, message: 'Update succesfully!', parent: updateStudent })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route DELETE dashboard/teacher/delete-student
// @desc delete student
// @access Private
router.delete('/delete-student/:id', verifyJWTandTeacher, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deleteStudent = await Student.findOneAndDelete(postDeleteCondition)
        if (!deleteStudent) {
            return res.status(401).json({ success: false, message: "Student not found!" })
        }
        res.json({ success: true, message: "Delete succesfully!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})
module.exports = router