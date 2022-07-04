const express = require('express')
const Account = require('../model/Account')
const router = express.Router()
const jwt = require('jsonwebtoken')
const argon = require('argon2')
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendEmail");


// @route RESET /api/admin/account
// @decs RESET parents
// @access Private Only Parent
router.get('/resetPassword/:email/:hashedEmail', async (req, res) => {
    const {  password  } = req.body
    let { email , hashedEmail} = req.params
    hashedEmail = decodeURIComponent(hashedEmail)
    console.log({ email , hashedEmail})

    if (!password) {
        return res.status(400).json({ success: false, message:'Missing information.Please fill in!'})
    }
    try {
        const account = await Account.findOne({account_email: email} )
        if (!account){
            return res.status(404).json({success: false, message: "Not Found"})
        }
        console.log({ email:account.account_email})
        // kèm thêm token
        bcrypt.compare(account.account_email, hashedEmail, (err, result) => {
            console.log('compare', result)
            if (result) {
                // account.account_password = await argon.hash(password)
                // await account.save()
                console.log({ username: account.account_username, role: account.account_role})
            }
            else {
                res.redirect("/500")
                return res.status(500).json({success: false, message: '' + err})
            }
        })

        account.account_password = await argon.hash(password)
        await account.save()
        res.json({success: true, message: "Password reseted!", account: account})
    } catch (e) {
        return res.status(500).json({success: false, message: '' + e})
    }
})

// @route GET /api/admin/account
// @decs GET parents
// @access Private Only Parent
router.get('/',async (req, res) => {
    try {
        const allAccount = await Account.find({})
        res.json({success: true, allAccount})
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})


// @route GET /api/admin/account
// @decs Forget password
// @access Public
router.get('/reset', async (req, res) => {
    const {email} = req.body
    //Simple validation
    if (!email)
        return res.status(400).json({success: false, message: 'Please fill in complete information'})
    try {
        // check for existing user
        const user = await Account.findOne({account_email:email})
        // console.log(user)
        if (!user)
            return res.status(400).json({success: false, message: 'Email is not existing!'})
        // all good
        bcrypt.hash(user.account_email, parseInt(10)).then((hashedEmail) => {
            hashedEmail = encodeURIComponent(hashedEmail);
            sendMail(email, "Reset Password", `<a href="${process.env.APP_URL}/api/admin/account/resetPassword/${user.account_email}/${hashedEmail}">Reset password</a>`)
            console.log(`${process.env.APP_URL}/api/admin/account/resetPassword/${user.account_email}/${hashedEmail}`)
        })
        res.json({success: true, message:"gui mail thanh cong"})
    } catch (error) {
        return res.status(500).json({success: false, message: '' + error})
    }
})

// @route GET /api/admin/account
// @decs reset password
// @access Private
router.post('/reset/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await Account.findById( id )
        if (!user)
            return res.status(404).json({success: false, message:"Not Found"})

        //user exist
        bcrypt.hash(user.account_email, parseInt(10)).then((hashedEmail) => {
            hashedEmail = encodeURIComponent(hashedEmail);
            sendMail(user.account_email, "Reset Password", `<a href="${process.env.APP_URL}/api/admin/account/resetPassword/${user.account_email}/${hashedEmail}">Change password</a>`)
            console.log(`${process.env.APP_URL}/api/admin/account/resetPassword/${user.account_email}/${hashedEmail}`)
        })
        res.json({success: true, message:"gui mail thanh cong"})
    } catch (e) {
        return res.status(500).json({success: false, message: '' + e})
    }
})


module.exports = router