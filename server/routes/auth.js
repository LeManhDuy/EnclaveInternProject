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
    const { account_username, account_password, account_role } = req.body
    //Simple validation
    if (!account_username || !account_password || !account_role)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        // check for existing user
        const admin = await Admin.findOne({ admin_email })
        const parent = await Parents.findOne({ parent_email })
        const teacher = await Teacher.findOne({ teacher_email })
        if (user)
            return res.status(400).json({ success: false, message: 'User name is existing' })

        // all good
        const hashPassword = await argon2.hash(account_password)
        const newUser = new User({ account_username, account_password: hashPassword, account_role })
        await newUser.save()
        //return token
        const accessToken = jwt.sign({ userId: newUser._id }
            , process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'Create account successfully', accessToken })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route GET api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    //Simple validation
    if (!email || !password)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })

    try {
        var validatePassword
        const admin = await Admin.findOne({ admin_email:email })
        const parent = await Parents.findOne({ parent_email:email })
        const teacher = await Teacher.findOne({ teacher_email:email })
        var accessToken
        
        if ( admin ) {
            accessToken = jwt.sign({ adminId: admin._id }
                , process.env.ACCESS_TOKEN_SECRET)
            validatePassword = await argon2.verify(admin.admin_password, password)
            return res.status(200).json({ success: true, message: 'This is admin' , accessToken})
        }
        if (parent) {
            accessToken = jwt.sign({ parentId: parent._id }
                , process.env.ACCESS_TOKEN_SECRET)
            validatePassword = await argon2.verify(parent.parent_password, password)
            return res.status(200).json({ success: true, message: 'This is parent' ,accessToken})
        }
        if(teacher) {
            accessToken = jwt.sign({ teacherId: teacher._id }
                , process.env.ACCESS_TOKEN_SECRET)
            validatePassword = await argon2.verify(teacher.teacher_password, password)
            return res.status(200).json({ success: true, message: 'This is teacher' ,accessToken})
        }
        if (!validatePassword)
            return res.status(400).json({ success: false, message: 'Incorrect email or password' })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

module.exports = router