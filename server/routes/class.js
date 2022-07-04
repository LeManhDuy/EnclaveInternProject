require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { authTeacher } = require('../middleware/verifyRoles')
const verifyJWT = require('../../server/middleware/verifyJWT')
const Class = require('../model/Class')

// @route GET dashboard/teacher/create-class
// @desc create class
// @access Private
router.post('/create-class', verifyJWT, authTeacher("Teacher"), async(req, res) => {
    const { class_name } = req.body
        //Simple validation
    if (!class_name)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        const newClass = new Class({ class_name })
        await newClass.save()
        res.json({ success: true, message: 'Create class successfully', class: newClass })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

module.exports = router