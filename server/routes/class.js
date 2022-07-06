require('dotenv').config()
const express = require('express')
const router = express.Router()
const {authTeacher} = require('../middleware/verifyRoles')
const verifyJWT = require('../../server/middleware/verifyJWT')
const Class = require('../model/Class')

// @route POST dashboard/teacher/class
// @desc create class
// @access Private
// router.post('/', verifyJWT, authTeacher("Teacher"), async (req, res) => {
router.post('/', verifyJWT, async (req, res) => {
    const {
        class_name,
    } = req.body
    //Simple validation
    if (!class_name)
        return res.status(400).json({success: false, message: 'Please fill in complete information'})
    try {
        const newClass = new Class({
            class_name,
            teacher_id: req.teacherId,
        })
        await newClass.save()
        res.json({success: true, message: 'Create class successfully', class: newClass})
    } catch (error) {
        return res.status(500).json({success: false, message: '' + error})
    }
})

// @route GET dashboard/teacher/class
// @desc get class
// @access Private
router.get('/', async (req, res) => {
    try {
        const allClasses = await Class.find({})
        res.json({success: true, allClasses})
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})


// @route PUT dashboard/teacher/class
// @desc update class
// @access Private
router.put('/:id', async (req, res) => {
    const {
        class_name,
    } = req.body

    if (!class_name) {
        return res.status(400).json({success: false, message: "Missing information. Please fill in!"})
    }
    try {
        let updateClass = {
            class_name,
        }
        const postUpdateCondition = {_id:req.params.id, user: req.userId}
        updatedClass = await Class.findOneAndUpdate(postUpdateCondition, updateClass, { new: true })
        if (!updateClass) {
            return res.status(401).json({success: false, message: "Class not found"})
        }
        dbClass = await Class.findById(req.params.id)
        res.json({success: true, message: 'Updated!', class: updateClass, dbClass:dbClass})
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})

// @route DELETEdashboard/teacher/class
// @desc delete class
// @access Private
router.delete('/:id', async (req, res) => {
    try {
        const postDeleteCondition = {_id: req.params, user: req.userId}
        const deleteClass = await Class.findOneAndDelete(postDeleteCondition)

        if (!deleteClass) {
            return res.status(401).json({success: false, message: "Class not found!"})
        }

        res.json({success: true, message: "Deleted!"})
    } catch (e) {
        return res.status(500).json({success: false, message: e})
    }
})

module.exports = router