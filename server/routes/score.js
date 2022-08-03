require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {authTeacher} = require('../middleware/verifyRoles')
const verifyJWT = require('../../server/middleware/verifyJWTandTeacher')
const Score = require('../model/Score')
const Subject = require('../model/Subject')
const Class = require("../model/Class");
const Grade = require("../model/Grade");
const Teacher = require("../model/Teacher");
const Student = require('../model/Student')

// @route POST dashboard/teacher/score/{{ subjectID }}&{{ studentID }}
// @desc create score
// @access Private
router.post('/:subjectID&:studentID', verifyJWT, async (req, res) => {
    const {subjectID, studentID} = req.params
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
    if (!subjectID || !studentID) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Lack of information'
            })
    }
    const subject = await Subject.findById(subjectID)
    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Subject is not existing!"
        })
    }
    const student = await Student.findById(studentID)
    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Student is not existing!"
        })
    }

    if (student.scores[0])
        for (let score_id of student.scores) {
            let score = await Score.findById(score_id)
            if (score) {
                if (score.subject_id.toString() === subjectID && score.student_id.toString() === studentID) {
                    return res.status(400).json({
                        success: false,
                        message: "This student already have this score of subject.",
                    })
                }
            }
        }
    let notHaveSubject = true
    for (let subject_id of student.subjects) {
        console.log(subject_id.toString() === subjectID.toString())
        if (subject_id.toString() === subjectID.toString()) {
            notHaveSubject = false
            break
        }
    }
    if (notHaveSubject) {
        return res.status(400).json({
            success: false,
            message: "This student don't have this subject. add project first!",
        })
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
            student_id: student,
            subject_id: subject
        })
        await newScore.save()
        subject.scores.push(newScore._id)
        await subject.save()
        student.scores.push(newScore._id)
        await student.save()
        res.json({
            success: true,
            message: 'Create score successfully',
            subject: subject.subject_name,
            student: student.student_fullname,
            score_ratio1: newScore.score_ratio1,
            score_ratio2: newScore.score_ratio2,
            score_ratio3: newScore.score_ratio3,
            score_average: newScore.score_average
        })
    } catch (error) {
        return res.status(500).json({success: false, message: '' + error})
    }
})
// @route GET api/teacher/score
// @desc get score by id subject and student
// @access Private
router.get('/get-by-subject-and-student/:subjectID&:studentID', verifyJWT, async (req, res) => {
    const {subjectID,studentID} = req.params
    const subject = await Subject.findById(subjectID)
    if (!subject)
        return res.status(404).json({
            success: false,
            message: "Subject is not existing!"
        })
    const student = await Student.findById(studentID)
    if (!student)
        return res.status(404).json({
            success: false,
            message: "Student is not existing!"
        })
    try {
        const score = await Score.findOne({subject_id:subjectID,student_id:studentID})
        if (!score)
            return res.status(404).json({
                success: false,
                message: "Score is not existing!"
            })
        res.json({success: true, score, subject:subject.subject_name, student:student.student_fullname})
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})
// @route GET api/teacher/score
// @desc get score by id student
// @access Private
router.get('/get-by-student/:studentID',async (req, res) => {
    const {studentID} = req.params
    const student = await Student.findById(studentID)
    if (!student)
        return res.status(404).json({
            success: false,
            message: "Student is not existing!"
        })
    try {
        const subjects = await Subject.find({students:studentID}).populate({path:'score_id',
            match:{student_id: studentID}})
        let showScores = []
        try {
            for (let subject of subjects) {
                showScores.push({subject:subject})
            }
        } catch (e) {
            return res.status(400).json({success: false, message: e})
        }

        res.json({
            success: true, student:{
                id: student._id, name: student.student_fullname
            }, detail: showScores
        })
    } catch (e) {
        return res.status(500).json({success: false, message: e})
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
        score_ratio1 = score.score_ratio1
    }
    if (!score_ratio2) {
        score_ratio2 = score.score_ratio2
    }
    if (!score_ratio3) {
        score_ratio3 = score.score_ratio3
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
        let updateScore = {
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
                    message: "Score not found"
                })
        }
        res.json({
            success: true,
            message: 'Updated!',
            score_ratio1: updateScore.score_ratio1,
            score_ratio2: updateScore.score_ratio2,
            score_ratio3: updateScore.score_ratio3,
            score_average: updateScore.score_average
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
        score_ratio1 = score.score_ratio1
    } else {
        score_ratio1 = score.score_ratio1.concat(score_ratio1)
    }
    if (!score_ratio2) {
        score_ratio2 = score.score_ratio2
    } else {
        score_ratio2 = score.score_ratio2.concat(score_ratio2)
    }
    if (!score_ratio3) {
        score_ratio3 = score.score_ratio3
    } else {
        score_ratio3 = score.score_ratio3.concat(score_ratio3)
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
        let addScore = {
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
                    message: "Score not found"
                })
        }
        res.json({
            success: true,
            message: 'Added!',
            score_ratio1: addScore.score_ratio1,
            score_ratio2: addScore.score_ratio2,
            score_ratio3: addScore.score_ratio3,
            score_average: addScore.score_average
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
                    message: "Score not found"
                })
        }
        if (score.subject_id) {
            const subject = await Subject.findById(score.subject_id.toString())
            if (!subject) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: "Subject not found"
                    })
            }
            subject.score_id.remove(score._id)
            subject.save()
        }

        if (score.student_id) {
            const student = await Student.findById(score.student_id.toString())
            if (!student) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: "Student not found"
                    })
            }
            student.scores = student.scores.filter(item => item._id.toString() !== score._id.toString())
            student.save()
        }

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