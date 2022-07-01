const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../model/Account')

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const { account_username, account_password, role } = req.body
    //Simple validation
    if (!account_username || !account_password || !role)
        return res.status(400).json({ success: false, message: 'Missing account username or password' })
    try {
        // check for existing user
        const user = await User.findOne({ account_username })
        if (user)
            return res.status(400).json({ success: false, message: 'Account user is existing' })

        // all good
        const hashPassword = await argon2.hash(account_password)
        const newUser = new User({ account_username, account_password: hashPassword })
        await newUser.save()
        //return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'Create account successfully', accessToken })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route GET api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
    const { account_username, account_password } = req.body
    //Simple validation
    if (!account_username || !account_password)
        return res.status(400).json({ success: false, message: 'Missing account username or password' })

    try {
        // check for existing user
        const user = await User.findOne({ account_username })
        if (!user)
            return res.status(400).json({ success: false, message: 'Incorrect account username' })

        const validatePassword = await argon2.verify(user.account_password, account_password)
        if (!validatePassword)
            return res.status(400).json({ success: false, message: 'Incorrect password' })
        //all good
        const accessToken = jwt.sign({ userId: User._id }, process.env.ACCESS_TOKEN_SECRET)
        return res.status(200).json({ success: true, message: 'Login successfull',accessToken })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

module.exports = router