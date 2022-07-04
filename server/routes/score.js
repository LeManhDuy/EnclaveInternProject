require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { authTeacher } = require('../middleware/verifyRoles')
const verifyJWT = require('../../server/middleware/verifyJWT')
const Score = require('../model/Score')

// @route GET dashboard/teacher/create-score
// @desc create score
// @access Private
router.post('/create-score', verifyJWT, authTeacher("Teacher"), async(req, res) => {
    const { score_ratio1, score_ratio2, score_ratio3 } = req.body
        //Simple validation
    if (!score_ratio1 || !score_ratio2 || !score_ratio3)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        const arr = [parseInt(score_ratio1), parseInt(score_ratio2), parseInt(score_ratio3)];
        var score_average = arr.reduce((a, b) => a + b, 0) / arr.length;
        const newScore = new Score({ score_ratio1, score_ratio2, score_ratio3, score_average })
        await newScore.save()
        res.json({ success: true, message: 'Create score successfully', score: newScore })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

module.exports = router