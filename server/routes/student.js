require('dotenv').config()
const express = require('express')
const router = express.Router()
const verifyJWTandTeacher = require('../middleware/verifyJWTandTeacher')
const Student = require('../model/Student')
const Teacher = require('../model/Teacher')
const Class = require('../model/Class')
const { ObjectId } = require('mongodb');
const Subject = require('../model/Subject')
const Grades = require('../model/Grade')

// @route GET dashboard/teacher/create-student
// @desc create student information
// @access Private
router.post('/create-student/:teacherID', verifyJWTandTeacher, async (req, res) => {
    const { teacherID } = req.params
    const { student_fullname, student_age, student_gender, student_image, student_behavior } = req.body
    //Simple validation
    if (!student_fullname || !student_age || student_gender == null || !student_image)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        const teacher = await Teacher.findById(teacherID)
        //save collection
        const newStudent = new Student({
            student_fullname,
            student_age,
            student_gender,
            student_image,
            teacher_id: teacher._id,
        })
        await newStudent.save()
        teacher.students.push(newStudent._id)
        await teacher.save()
        res.json({ success: true, message: 'Create student successfully', student: newStudent })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route GET dashboard/teacher/get-student-by-teacher-id
// @desc get student information
// @access Private
router.get('/get-student-by-teacher-id/:teacherID', verifyJWTandTeacher, async (req, res) => {
    const { teacherID } = req.params
    try {
        const teacher = await Teacher.findById(teacherID).populate('students')
        return res.status(200).json({ teacher_name: teacher.teacher_name, students: teacher.students })
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
router.get('/get-student-by-student-id/:studentID&:classID', verifyJWTandTeacher, async (req, res) => {
    const { studentID, classID } = req.params
    try {
        // Return token
        const getStudentById = await Student.findById(studentID).populate("subjects", ["subject_ratio", "subject_name"])
        //console.log(getStudentById.subjects[0].grade_id);
        const gradeById = await Grades.findById(getStudentById.subjects[0].grade_id.toString()).populate("grade_name")
        //console.log(gradeById);
        const getClass = await Class.findById(classID)
        if (!getStudentById)
            return res.status(401).json({ success: false, message: 'Student is not found!' })
        return res.status(200).json({
            // student_fullname: getStudentById.student_fullname,
            // student_age: getStudentById.student_age,
            // student_gender: getStudentById.student_gender,
            // student_image: getStudentById.student_image,
            // student_behavior: getStudentById.student_behavior,
            // class_name: getClass.class_name,
            getStudentById: getStudentById,
            class_name: getClass.class_name,
            grade_name: gradeById
        })
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
        student_image } = req.body
    // Validation
    if (!student_fullname || !student_age || student_gender == null || !student_image)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        let updateStudent = {
            student_fullname,
            student_age,
            student_gender,
            student_image
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