const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const Admin = require('../model/Admin')
const Teacher = require('../model/Teacher')
const Parents = require('../model/Parents')

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body
    //Simple validation
    if (!email || !password || !role)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        // check for existing user
        //     return res.status(400).json({success: false, message: 'User name is existing'})
        const admin = await Admin.findOne({ admin_email:email })
        const parent = await Parents.findOne({ parent_email:email })
        const teacher = await Teacher.findOne({ teacher_email:email })
        if (admin || parent || teacher)
            return res.status(400).json({ success: false, message: 'User name is existing' })

        // all good
        switch (role) {
            case 'admin':
                const hashPassword = await argon2.hash(password)
                const newAdmin = new Admin({ password, account_password: hashPassword })
                await newAdmin.save()
                const accessToken = jwt.sign({ userId: newAdmin._id }
                    , process.env.ACCESS_TOKEN_SECRET)
                res.json({ success: true, message: 'Create account successfully', accessToken })
        }
    } catch (error) {
        return res.status(500).json({success: false, message: '' + error})
    }
})

// @route GET api/auth/
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
    const {email, password} = req.body
    //Simple validation
    if (!email || !password)
        return res.status(400).json({success: false, message: 'Please fill in complete information'})

    try {
        let validatePassword
        const admin = await Admin.findOne({admin_email: email})
        const parent = await Parents.findOne({parent_email: email})
        const teacher = await Teacher.findOne({teacher_email: email})
        let accessToken

        if (admin) {
            accessToken = jwt.sign({adminId: admin._id}
                , process.env.ACCESS_TOKEN_SECRET)
            validatePassword = await argon2.verify(admin.admin_password, password)
            if (!validatePassword)
                return res.status(400).json({success: false, message: 'Incorrect email or password'})
            return res.status(200).json({success: true, message: 'This is admin', role: 'admin', type:"Bearer", accessToken})
        }
        if (parent) {
            accessToken = jwt.sign({parentId: parent._id}
                , process.env.ACCESS_TOKEN_SECRET)
            validatePassword = await argon2.verify(parent.parent_password, password)
            if (!validatePassword)
                return res.status(400).json({success: false, message: 'Incorrect email or password'})
            return res.status(200).json({success: true, message: 'This is parent', type:"Bearer", role: 'parent', accessToken})
        }
        if (teacher) {
            accessToken = jwt.sign({teacherId: teacher._id}
                , process.env.ACCESS_TOKEN_SECRET)
            validatePassword = await argon2.verify(teacher.teacher_password, password)
            if (!validatePassword)
                return res.status(400).json({success: false, message: 'Incorrect email or password'})
            return res.status(200).json({success: true, message: 'This is teacher', type:"Bearer", role: 'teacher', accessToken})
        }
        if (!admin && !teacher && ! parent) {
            return res.status(400).json({ success: false, message: 'This email does not exists'})
        }

    } catch (error) {
        return res.status(500).json({success: false, message: '' + error})
    }
})

module.exports = router