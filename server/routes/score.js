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

// @route GET dashboard/teacher/score
// @desc create score
// @access Private
// router.post('/', verifyJWT, authTeacher("Teacher"), async(req, res) => {
router.post('/:subjectId', verifyJWT, async (req, res) => {
    const { subjectId } = req.params
    const {
        score_ratio1,
        score_ratio2,
        score_ratio3
    } = req.body
    //Simple validation
    if (!score_ratio1 || !score_ratio2 || !score_ratio3)
        return res
            .status(400)
            .json({
                success: false,
                message: 'Please fill in complete information'
            })
    try {
        //validateion
        const subject = await Subject.findById(subjectId)

        if (!subject) {
            return res.status(404).json({ success: false, message: "Subject is not existing!" })
        }
        let arr = score_ratio1
            .concat(score_ratio2)
            .concat(score_ratio2)
            .concat(score_ratio3)
            .concat(score_ratio3)
            .concat(score_ratio3)

        // const arr = [parseInt(score_ratio1), parseInt(score_ratio2), parseInt(score_ratio2), parseInt(score_ratio3), parseInt(score_ratio3), parseInt(score_ratio3)];
        console.log({ arr: arr, length: arr.length })
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
            subject: subject.subject_name,
            score: newScore
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// @route GET dashboard/teacher/score
// @desc get score
// @access Private
router.get('/', async (req, res) => {
    try {
        const allScore = await Class.find({})
        res.json({ success: true, allScore })
    } catch (e) {
        return res.status(500).json({ success: false, message: e })
    }
})

// @route PUT dashboard/teacher/score
// @desc update score
// @access Private
router.put('/:id&:subjectId', async (req, res) => {
    const {
        id,
        subjectId
    } = req.params
    const {
        score_ratio1,
        score_ratio2,
        score_ratio3
    } = req.body
    const score = await Score.findById(id)
    const subject = await Subject.findById(subjectId)
    if (!score || !subject) {
        return res
            .status(404)
            .json({
                success: false,
                message: "Score or Subject is not existing!"
            })
    }
    if (!score_ratio1 || !score_ratio2 || !score_ratio3)
        return res
            .status(400)
            .json({
                success: false,
                message: 'Please fill in complete information'
            })
    try {
        let arr = score_ratio1
            .concat(score_ratio2)
            .concat(score_ratio2)
            .concat(score_ratio3)
            .concat(score_ratio3)
            .concat(score_ratio3)
        let score_average = arr.reduce((a, b) => a + b, 0) / arr.length;
        score_average = score_average.toFixed(0)
        const updateScore = new Score({
            score_ratio1,
            score_ratio2,
            score_ratio3,
            score_average,
            subject_id: score.subject_id
        })
        const postUpdateCondition = { _id: id, user: req.userId }

        updatedScore = await Score.findOneAndUpdate(postUpdateCondition, updateScore, { new: true })
        console.log("day la update")

        if (!updateScore) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Score not found"
                })
        }
        dbScore = await Class.findById(id)
        res.json({
            success: true,
            message: 'Updated!',
            class: updateScore,
            dbScore: dbScore
        })
    } catch (e) {
        return res.status(500).json({ success: false, message: e })
    }
})


// @route DELETE dashboard/teacher/score
// @desc delete score
// @access Private
router.delete('/:id', async (req, res) => {
    try {
        const postDeleteCondition = {
            _id: req.params.id,
            user: req.userId
        }
        const deleteScore = await Score.findOneAndDelete(postDeleteCondition)

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
            message: "Deleted!"
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