require('dotenv').config()
const express = require('express')
const router = express.Router()
const verifyJWTandTeacher = require('../middleware/verifyJWTandTeacher')
const Schedule = require('../model/Schedule')
const { route } = require('./subject')
// Create
router.post("/create-schedule", verifyJWTandTeacher, async (req, res) => {
    //const { classId } = req.params
    const { schedule_link } = req.body;
    try {
        // Validate
        // const Class = await Class.findById()
        // const scheduleValidate = await Schedule.findById({ _id: grade_name });
        // if (gradeValidate) {
        //     return res
        //         .status(400)
        //         .json({ success: false, message: "Grade name is existing" });
        // }
        const newSchedule = new Schedule({
            schedule_link: schedule_link,
        });
        await newSchedule.save();
        res.json({ success: true, message: "Create schedule successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router