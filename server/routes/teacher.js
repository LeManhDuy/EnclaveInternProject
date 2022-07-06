const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWTandTeacher')
const Teachers = require('../model/Teacher')
const Admin = require('../model/Admin')
const Parents = require('../model/Parents')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')


router.post('/teacher', verifyJWT, (req, res) => {
    res.send('Teacher page')
})

// Create
router.post('/', async(req, res) => {
    const {
        teacher_name,
        teacher_age,
        teacher_gender,
        teacher_phone,
        is_main_teacher,
        is_user_teacher,
        teacher_email,
        teacher_password,
    } = req.body
    // Validation
    if (!teacher_name || !teacher_phone || !teacher_email || !teacher_password ) {
        return res.status(400).json({ success: false, message:'Missing information.Please fill in!'})
    }
    if (teacher_phone.length != 10 ){
        return res.status(400).json({ success: false, message:'Phone number must have 10 numbers'})
    }
    try {
        const adminValidate = await Admin.findOne({ admin_email:teacher_email })
        const parentValidate = await Parents.findOne({ parent_email:teacher_email })
        const teacherValidate = await Teachers.findOne({ teacher_email })
        if (adminValidate || parentValidate || teacherValidate)
            return res.status(400).json({ success: false, message: 'Email address is existing' })
        // Good to die
        // Good to die
        const hashPassword = await argon2.hash(teacher_password)
        const teacher = new Teachers({
            teacher_name,
            teacher_age,
            teacher_gender,
            teacher_phone,
            is_main_teacher,
            is_user_teacher,
            teacher_email,
            teacher_password:hashPassword,
        })
        await teacher.save()
        // Return token
        const accessToken = jwt.sign({ userId: teacher._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'Create teacher successfully', accessToken })
    } catch(error) {
        return res.status(500).json({ success: false, message: '' + error})
    }
    
})

// Get
router.get('/', async(req, res) => {
    try {
        // Return token
        const allTeachers = await Teachers.find({})
        res.json({ success: true, allTeachers })
    } catch(error) {
        return res.status(500).json({ success: false, message: '' + error})
    }
    
})

router.get('/:id', async (req, res) => {
    try {
        const teacher = await Teachers.findOne({ _id: req.params.id })
        if (!teacher)
            return res.status(400).json({ success: false, message: 'Teacher not found' })
        res.json({ success: true, teacher })
    } catch( error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

router.put('/:id', async(req, res) => {
    const {
        teacher_name,
        teacher_age,
        teacher_gender,
        teacher_phone,
        is_main_teacher,
        is_user_teacher,
        teacher_email,
        teacher_password,
    } = req.body
    // Validation
    if (!teacher_name || !teacher_phone ) {
        return res.status(400).json({ success: false, message:'Missing information.Please fill in!'})
    }
    if (teacher_phone.length != 10 ){
        return res.status(400).json({ success: false, message:'Phone number must have 10 numbers'})
    }
    try {
        const hashPassword = await argon2.hash(teacher_password)
        let updateTeacher = {
            teacher_name,
            teacher_age,
            teacher_gender,
            teacher_phone,
            is_main_teacher,
            is_user_teacher,
            teacher_email,
            teacher_password:hashPassword,
        }
        const postUpdateCondition = {_id: req.params.id, user: req.userId}
        updatedTeacher = await Teachers.findOneAndUpdate(postUpdateCondition, updateTeacher, {new: true})

        if (!updateTeacher) 
            return res.status(401).json({success: false, message:'Teacher not found'})
        res.json({success:true, message: 'Updated!', teacer: updateTeacher})
    } catch {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const deletedTeacher = await Teachers.findOneAndDelete(postDeleteCondition)

        if (!deletedTeacher) 
            return res.status(401).json({success: false, message:'Teacher not found'})
        res.json({success:true, message: 'Deleted!', parent: deletedTeacher})        
    } catch {
        return res.status(500).json({ success: false, message: '' + error })
    }   
})

module.exports = router