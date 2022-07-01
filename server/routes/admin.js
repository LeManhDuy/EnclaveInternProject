const express = require('express')
const Account = require('../model/Account')
const router = express.Router()
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

// CREATE
router.post('/', async(req, res) => {
    const {
        account_username,
        account_password,
        account_role,
    } = req.body
    // Validation
    if (!account_username || !account_password || !account_role)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        // check for existing user
        const user = await Account.findOne({ account_username })
        if (user)
            return res.status(400).json({ success: false, message: 'User name is existing' })

        // all good
        const hashPassword = await argon2.hash(account_password)
        const newUser = new Account({ account_username, account_password: hashPassword, account_role })
        await newUser.save()
        //return token
        const accessToken = jwt.sign({ userId: newUser._id }
            , process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'Create account successfully', accessToken })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// GET
router.get('/', async(req, res) => {
    try {
        // Return token
        const allAccount = await Account.find({})
        res.json({ success: true, allAccount })
    } catch(error) {
        return res.status(500).json({ success: false, message: '' + error})
    }
    
})

// PUT
router.put('/:id', async(req, res) => {
    const {
        account_username,
        account_password,
        account_role,
    } = req.body
    // Validation
    if (!account_username || !account_password || !account_role)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        const hashPassword = await argon2.hash(account_password)
        let updateAccount = {
            account_username,
            account_password:hashPassword,
            account_role,
        }
        const postUpdateCondition = {_id: req.params.id, user: req.userId}
        updatedAccount = await Account.findOneAndUpdate(postUpdateCondition, updateAccount, {new: true})

        if (!updateAccount) 
            return res.status(401).json({success: false, message:'Account not found'})
        res.json({success:true, message: 'Updated!', parent: updateAccount})
    } catch {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// Delete
router.delete('/:id', async(req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const deletedAccount = await Account.findOneAndDelete(postDeleteCondition)

        if (!deletedAccount) 
            return res.status(401).json({success: false, message:'Account not found'})
        res.json({success:true, message: 'Deleted!', parent: deletedAccount})        
    } catch {
        return res.status(500).json({ success: false, message: '' + error })
    }   
})

module.exports = router