require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { authTeacher } = require('../middleware/verifyRoles')
const verifyJWT = require('../middleware/verifyJWTandTeacher')
const schoolYear = require('../model/Schoolyear')

// @route GET dashboard/teacher/create-schoolyear
// @desc create schoolyear
// @access Private
router.post('/create-schoolyear', verifyJWT, authTeacher("Teacher"), async(req, res) => {
    const { schoolyear_name } = req.body
        //Simple validation
    if (!schoolyear_name)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        const newSchoolYear = new schoolYear({ schoolyear_name })
        await newSchoolYear.save()
        res.json({ success: true, message: 'Create score successfully', schoolYear: newSchoolYear })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

module.exports = router