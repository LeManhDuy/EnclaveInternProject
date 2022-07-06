const express = require('express')
const router = express.Router()
const Grades = require('../model/Grade')

// Create 
router.post('/', async (req, res) => {
    const {grade_name} = req.body
    try {
        // Validate
        const gradeValidate = await Grades.findOne({ grade_name : grade_name})
        if (gradeValidate) {
            return res.status(400).json({ success: false, message: 'Grade name is existing' })            
        }
        const newGrade = new Grades({
            grade_name:grade_name,
        })
        await newGrade.save()
        res.json({ success: true, message: 'Create grade successfully' })
    } catch(error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// Get
router.get('/', async (req, res) => {
    try {
        // Return token
        const allGrades = await Grades.find({})
        res.json({ success: true, allGrades })
    } catch (error) {
        return res.status(500).json({ success: false, message: '' + error })
    }

})

// Update
router.put('/:id', async (req, res) => {
    const {grade_name} = req.body
    try {
        // Validate
        const gradeValidate = await Grades.findOne({ grade_name : grade_name})
        if (gradeValidate) {
            return res.status(400).json({ success: false, message: 'Grade name is existing' })            
        }
        let updateGrade = {
            grade_name,
        }
        const postUpdateCondition = { _id: req.params.id }
        updatedGrade = await Grades.findOneAndUpdate(postUpdateCondition, updateGrade, { new: true })

        if (!updatedGrade)
            return res.status(401).json({ success: false, message: 'Grade not found' })
        res.json({ success: true, message: 'Updated!', grade: updateGrade })
    } catch(error) {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id }
        const deletedGrade = await Grades.findOneAndDelete(postDeleteCondition)

        if (!deletedGrade)
            return res.status(401).json({ success: false, message: 'Grade not found' })
        res.json({ success: true, message: 'Deleted!', grade: deletedGrade })
    } catch {
        return res.status(500).json({ success: false, message: '' + error })
    }
})

module.exports = router