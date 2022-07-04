const express = require('express')
const Admin = require('../model/Admin')
const router = express.Router()
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

// CREATE
router.post('/', async(req, res) => {
    const {
        admin_username,
        admin_password,
        admin_email,
    } = req.body
    // Validation
    if (!admin_username || !admin_password || !admin_email)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        // check for existing user
        const user = await Admin.findOne({ admin_username })
        if (user)
            return res.status(400).json({ success: false, message: 'User name is existing' })

        // all good
        const hashPassword = await argon2.hash(admin_password)
        const newUser = new Admin({ admin_username, admin_password: hashPassword, admin_email })
        await newUser.save()
        //return token
        const accessToken = jwt.sign({ userId: newUser._id }
            , process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'Create admin successfully', accessToken })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// GET
router.get('/', async(req, res) => {
    try {
        // Return token
        const alladmin = await Admin.find({})
        res.json({ success: true, alladmin })
    } catch(error) {
        return res.status(500).json({ success: false, message: '' + error})
    }
    
})

// PUT
router.put('/:id', async(req, res) => {
    const {
        admin_username,
        admin_password,
        admin_email,
    } = req.body
    // Validation
    if (!admin_username || !admin_password|| !admin_email)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        const hashPassword = await argon2.hash(admin_password)
        let updateadmin = {
            admin_username,
            admin_password:hashPassword,
            admin_email,
        }
        const postUpdateCondition = {_id: req.params.id, user: req.userId}
        updatedadmin = await Admin.findOneAndUpdate(postUpdateCondition, updateadmin, {new: true})

        if (!updateadmin) 
            return res.status(401).json({success: false, message:'admin not found'})
        res.json({success:true, message: 'Updated!', parent: updateadmin})
    } catch {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// Delete
router.delete('/:id', async(req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const deletedadmin = await Admin.findOneAndDelete(postDeleteCondition)

        if (!deletedadmin) 
            return res.status(401).json({success: false, message:'admin not found'})
        res.json({success:true, message: 'Deleted!', parent: deletedadmin})        
    } catch {
        return res.status(500).json({ success: false, message: '' + error })
    }   
})

module.exports = router