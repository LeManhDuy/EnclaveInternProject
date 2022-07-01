const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../model/Account')

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
        const user = await User.findOne({ account_username })
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
    const { account_username, account_password, account_role } = req.body
    //Simple validation
    if (!account_username || !account_password || !account_role)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })

    try {
        // checking
        const user = await User.findOne({ account_username })
        const validatePassword = await argon2.verify(user.account_password, account_password)

        if (!user || !validatePassword)
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })

        //all good
        const accessToken = jwt.sign({ userRole: user.account_role }
            , process.env.ACCESS_TOKEN_SECRET)

        switch (account_role) {
            case "Admin":
                return res.send().status(200).json({ success: true, message: 'Admin - Login successfull', accessToken })
            case "Teacher":
                return res.status(200).json({ success: true, message: 'Teacher - Login successfull', accessToken })
            case "Parent":
                return res.status(200).json({ success: true, message: 'Parent - Login successfull', accessToken })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

module.exports = router