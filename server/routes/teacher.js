const express = require('express')
const router = express.Router()
const { authTeacher } = require('../middleware/verifyRoles')
const verifyJWT = require('../../server/middleware/verifyJWT')
const Teachers = require('../model/Teacher')
const jwt = require('jsonwebtoken')


router.post('/teacher', verifyJWT, authTeacher("Teacher"), (req, res) => {
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
    } = req.body
    // Validation
    if (!teacher_name || !teacher_phone ) {
        return res.status(400).json({ success: false, message:'Missing information.Please fill in!'})
    }
    if (teacher_phone.length != 10 ){
        return res.status(400).json({ success: false, message:'Phone number must have 10 numbers'})
    }
    try {
        // Good to die
        const teacher = new Teachers({
            teacher_name,
            teacher_age,
            teacher_gender,
            teacher_phone,
            is_main_teacher,
            is_user_teacher,
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

router.put('/:id', async(req, res) => {
    const {
        teacher_name,
        teacher_age,
        teacher_gender,
        teacher_phone,
        is_main_teacher,
        is_user_teacher,
    } = req.body
    // Validation
    if (!teacher_name || !teacher_phone ) {
        return res.status(400).json({ success: false, message:'Missing information.Please fill in!'})
    }
    if (teacher_phone.length != 10 ){
        return res.status(400).json({ success: false, message:'Phone number must have 10 numbers'})
    }
    try {
        let updateTeacher = {
            teacher_name,
            teacher_age,
            teacher_gender,
            teacher_phone,
            is_main_teacher,
            is_user_teacher,
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