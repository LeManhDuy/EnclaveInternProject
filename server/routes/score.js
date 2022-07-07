require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { authTeacher } = require('../middleware/verifyRoles')
const verifyJWT = require('../../server/middleware/verifyJWTandTeacher')
const Score = require('../model/Score')

// @route GET dashboard/teacher/score
// @desc create score
// @access Private
// router.post('/', verifyJWT, authTeacher("Teacher"), async(req, res) => {
router.post('/', verifyJWT, async(req, res) => {
    const { score_ratio1, score_ratio2, score_ratio3, subject_name, student_id,  } = req.body
        //Simple validation
    if (!score_ratio1 || !score_ratio2 || !score_ratio3)
        return res.status(400).json({ success: false, message: 'Please fill in complete information' })
    try {
        let arr = score_ratio1.concat(score_ratio2).concat(score_ratio2).concat(score_ratio3).concat(score_ratio3).concat(score_ratio3)

        // const arr = [parseInt(score_ratio1), parseInt(score_ratio2), parseInt(score_ratio2), parseInt(score_ratio3), parseInt(score_ratio3), parseInt(score_ratio3)];
        console.log({arr: arr,length: arr.length})
        let score_average = arr.reduce((a, b) => a + b, 0) / arr.length;
        score_average = score_average.toFixed(0)
        let rank
        if (score_average>=9) {
            rank = "Xuất sắc"
        } else if (score_average>=7) {
            rank = "Giỏi"
        } else if (score_average>=5) {
            rank = "Khá"
        } else {
            rank = "Trung bình"
        }
        const newScore = new Score({ score_ratio1, score_ratio2, score_ratio3, score_average })
        await newScore.save()
        res.json({ success: true, message: 'Create score successfully', score: newScore, rank: rank })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

module.exports = router