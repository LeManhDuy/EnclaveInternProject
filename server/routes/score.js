require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { authTeacher } = require('../middleware/verifyRoles')
const verifyJWT = require('../../server/middleware/verifyJWTandTeacher')
const Score = require('../model/Score')
const Subject = require('../model/Subject')
const Class = require("../model/Class");
const Grade = require("../model/Grade");
const Teacher = require("../model/Teacher");

// @route POST dashboard/teacher/score/{{ subject_id }}
// @desc create score
// @access Private
router.post('/:subjectId',verifyJWT, async(req, res) => {
    const { subjectId } = req.params
    let {
        score_ratio1,
        score_ratio2,
        score_ratio3
    } = req.body
        //Validation
    if (!score_ratio1 && !score_ratio2 && !score_ratio3)
        return res
            .status(400)
            .json({
                success: false,
                message: 'Please at least one in complete information'
            })
    const subject = await Subject.findById(subjectId)
    if (!subject) {
        return res
            .status(404)
            .json({
                success: false,
                message: "Subject is not existing!"
            })
    }

    if (subject.score_id) {
        return res.status(400).json({
            success: false,
            message: "This subject already have score.",
        });
    }
    if (score_ratio1 < 0 || score_ratio1 > 10)
        return res
            .status(400)
            .json({
                success: false,
                message: 'score_ratio1:invalid format'
            })
    if (score_ratio2 < 0 || score_ratio2 > 10)
        return res
            .status(400)
            .json({
                success: false,
                message: 'score_ratio2:invalid format'
            })
    if (score_ratio3 < 0 || score_ratio3 > 10)
        return res
            .status(400)
            .json({
                success: false,
                message: 'score_ratio3:invalid format'
            })
    try {
        // solve average
        let arr = []
        if (score_ratio1) {
            arr = arr.concat(score_ratio1)
        }
        if (score_ratio2) {
            arr = arr.concat(score_ratio2)
            arr = arr.concat(score_ratio2)
        }
        if (score_ratio3) {
            arr = arr.concat(score_ratio3)
            arr = arr.concat(score_ratio3)
            arr = arr.concat(score_ratio3)
        }
        let score_average = arr.reduce((a, b) => a + b, 0) / arr.length;
        score_average = score_average.toFixed(0)
        const newScore = new Score({
            score_ratio1,
            score_ratio2,
            score_ratio3,
            score_average,
            subject_id: subject
        })
        await newScore.save()
        subject.score_id = newScore._id
        await subject.save()
        res.json({
            success: true,
            message: 'Create score successfully',
            subject:subject.subject_name,
            score_ratio1:newScore.score_ratio1,
            score_ratio2:newScore.score_ratio2,
            score_ratio3:newScore.score_ratio3,
            score_average:newScore.score_average
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route GET dashboard/teacher/score
// @desc get score
// @access Private
router.get('/', verifyJWT, async (req, res) => {
    try {
        const allScore = await Score.find({})
        res.json({success: true, allScore})
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})

// @route PUT dashboard/teacher/score/{{ score_id }}
// @desc update score
// @access Private
router.put('/:id', verifyJWT, async (req, res) => {
    const {
        id
    } = req.params
    let {
        score_ratio1,
        score_ratio2,
        score_ratio3
    } = req.body
    const score = await Score.findById(id)
    if (!score) {
        return res
            .status(404)
            .json({
                success: false,
                message: "Score is not existing!"
            })
    }
    if (!score_ratio1 && !score_ratio2 && !score_ratio3)
        return res
            .status(400)
            .json({
                success: false,
                message: 'Please at least one in complete information'
            })
    if (!score_ratio1) {
        score_ratio1=score.score_ratio1
    }
    if (!score_ratio2) {
        score_ratio2=score.score_ratio2
    }
    if (!score_ratio3) {
        score_ratio3=score.score_ratio3
    }
    try {
        let arr = score_ratio1
            .concat(score_ratio2)
            .concat(score_ratio2)
            .concat(score_ratio3)
            .concat(score_ratio3)
            .concat(score_ratio3)
        let score_average = arr.reduce((a, b) => a + b, 0) / arr.length;
        score_average = score_average.toFixed(0)
        let updateScore ={
            score_ratio1,
            score_ratio2,
            score_ratio3,
            score_average
        }
        const scoreUpdateCondition = {_id: id, user: req.userId}
        updatedScore = await Score.findOneAndUpdate(scoreUpdateCondition, updateScore, {new: true})
        if (!updateScore) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Score not found"})
        }
        res.json({
            success: true,
            message: 'Updated!',
            score_ratio1:updateScore.score_ratio1,
            score_ratio2:updateScore.score_ratio2,
            score_ratio3:updateScore.score_ratio3,
            score_average:updateScore.score_average
        })
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})

// @route PUT dashboard/teacher/score/add/{{ id }}
// @desc update add score
// @access Private
router.put('/add/:id', verifyJWT, async (req, res) => {
    const {
        id
    } = req.params
    let {
        score_ratio1,
        score_ratio2,
        score_ratio3
    } = req.body
    const score = await Score.findById(id)
    //validation
    if (!score) {
        return res
            .status(404)
            .json({
                success: false,
                message: "Score is not existing!"
            })
    }
    if (!score_ratio1 && !score_ratio2 && !score_ratio3)
        return res
            .status(400)
            .json({
                success: false,
                message: 'Please fill in complete information'
            })
    if (!score_ratio1) {
        score_ratio1=score.score_ratio1
    } else {
        score_ratio1=score.score_ratio1.concat(score_ratio1)
    }
    if (!score_ratio2) {
        score_ratio2=score.score_ratio2
    } else {
        score_ratio2=score.score_ratio2.concat(score_ratio2)
    }
    if (!score_ratio3) {
        score_ratio3=score.score_ratio3
    } else {
        score_ratio3=score.score_ratio3.concat(score_ratio3)
    }
    try {
        // solve average
        let arr = score_ratio1
            .concat(score_ratio2)
            .concat(score_ratio2)
            .concat(score_ratio3)
            .concat(score_ratio3)
            .concat(score_ratio3)
        let score_average = arr.reduce((a, b) => a + b, 0) / arr.length;
        score_average = score_average.toFixed(0)
        let addScore ={
            score_ratio1,
            score_ratio2,
            score_ratio3,
            score_average
        }
        const scoreAddCondition = {_id: id, user: req.userId}
        addedScore = await Score.findOneAndUpdate(scoreAddCondition, addScore, {new: true})
        if (!addScore) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Score not found"})
        }
        res.json({
            success: true,
            message: 'Added!',
            score_ratio1:addScore.score_ratio1,
            score_ratio2:addScore.score_ratio2,
            score_ratio3:addScore.score_ratio3,
            score_average:addScore.score_average
        })
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})

// @route DELETE dashboard/teacher/score/{{ score_id }}
// @desc delete score
// @access Private
router.delete('/:id', verifyJWT, async (req, res) => {
    try {
        const scoreDeleteCondition = {
            _id: req.params.id,
            user: req.userId
        }
        const score = await Score.findById(scoreDeleteCondition._id)
        if (!score) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Score not found"})
        }

        const subject = await Subject.findById(score.subject_id.toString())
        if (!subject) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Subject not found"})
        }
        subject.score_id = undefined
        subject.save()
        const deleteScore = await Score.findOneAndDelete(scoreDeleteCondition)
        if (!deleteScore) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Score not found!"
                })
        }

        res.json({
            success: true,
            message: "Deleted!",
            subject: deleteScore
        })
    } catch (e) {
        return res
            .status(500)
            .json({
                success: false,
                message: e
            })
    }
})
module.exports = router