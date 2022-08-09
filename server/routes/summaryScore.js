const express = require("express");
const router = express.Router();
const Summary = require("../model/SummaryScore");
const Student = require("../model/Student");
const Score = require("../model/Score");
const verifyJWTandTeacher = require("../middleware/verifyJWTandTeacher");

// Create Summary
router.get("/:studentID", async (req, res) => {
    try {
        const { studentID } = req.params;
        //student
        const student = await Student.findById(studentID);
        // .populate("scores");
        // .populate("summary", ["summary_score", "summary_behavior"])
        // .select(["student_fullname"]);
        if (!student)
            return res
                .status(401)
                .json({ success: false, message: "Student is not found!" });
        //score
        console.log(student.scores);
        const arrScoreId = [];
        student.scores.map((item) => {
            arrScoreId.push(item.toString());
        });
        const getScoreById = await Score.find({ _id: arrScoreId })
            .populate("subject_id", ["subject_name", "subject_ratio"])
            .select("score_average");
        if (student.summary) {
            await Summary.findByIdAndDelete(student.summary._id.toString());
            student.summary = undefined;
            let sum = 0;
            let totalSubject = getScoreById.length;
            let behavior;
            getScoreById.map((item) => {
                let point = item.score_average;
                let multiple = item.subject_id.subject_ratio;

                if (multiple == 2) totalSubject += 1;
                var ratio = point * multiple;
                sum = sum + ratio;
            });
            let result = sum / totalSubject;
            if (result >= 9) behavior = "A";
            else if (result >= 8 && result < 9) behavior = "B";
            else if (result >= 7 && result < 8) behavior = "C";
            else if (result >= 6 && result < 7) behavior = "D";
            else behavior = "F";
            const newSummary = new Summary({
                summary_behavior: behavior,
                summary_score: result,
                student_id: student._id,
            });
            await newSummary.save();
            student.summary = newSummary._id;
            await student.save();
            return res.status(200).json({
                student: student,
                score: getScoreById,
                summary: newSummary,
            });
        } else {
            let sum = 0;
            let totalSubject = getScoreById.length;
            let behavior;
            getScoreById.map((item) => {
                let point = item.score_average;
                let multiple = item.subject_id.subject_ratio;

                if (multiple == 2) totalSubject += 1;
                var ratio = point * multiple;
                sum = sum + ratio;
            });
            let result = sum / totalSubject;
            if (result >= 9) behavior = "A";
            else if (result >= 8 && result < 9) behavior = "B";
            else if (result >= 7 && result < 8) behavior = "C";
            else if (result >= 6 && result < 7) behavior = "D";
            else behavior = "F";
            const newSummary = new Summary({
                summary_behavior: behavior,
                summary_score: result,
                student_id: student._id,
            });
            await newSummary.save();
            student.summary = newSummary._id;
            await student.save();
            return res.status(200).json({
                student: student,
                score: getScoreById,
                summary: newSummary,
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Create Score For Subject
router.post("/:studentID", verifyJWTandTeacher, async (req, res) => {
    const { studentID } = req.params;
    const { summary_behavior, summary_score } = req.body;
    if (!summary_behavior || !summary_score) {
        return res.status(400).json({
            success: false,
            message: "Missing information.Please fill in!",
        });
    }
    try {
        //Validate
        const student = await Student.findById(studentID);
        if (!student) {
            return res.status(400).json({
                success: false,
                message: "This student does not exist.",
            });
        }
        if (student.summary) {
            return res.status(400).json({
                success: false,
                message: "This student already have summary.",
            });
        }
        const newSummary = new Summary({
            summary_behavior,
            summary_score,
            student_id: student,
        });
        await newSummary.save();
        student.summary = newSummary._id;
        await student.save();
        res.json({
            success: true,
            message: "Create score successfully",
            summary: newSummary,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Get
router.get("/", verifyJWTandTeacher, async (req, res) => {
    try {
        // Return token
        const allSummary = await Summary.find({});
        res.json({ success: true, allSummary });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

//Update
router.put("/:summaryID", verifyJWTandTeacher, async (req, res) => {
    const { summary_behavior, summary_score } = req.body;
    // Validation
    if (!summary_behavior || !summary_score) {
        return res.status(400).json({
            success: false,
            message: "Missing information.Please fill in!",
        });
    }
    try {
        let updateSummary = {
            summary_behavior,
            summary_score,
        };
        const postUpdateCondition = { _id: req.params.summaryID };
        const updatedSummary = await Summary.findOneAndUpdate(
            postUpdateCondition,
            updateSummary,
            { new: true }
        );
        console.log(updatedSummary);
        if (!updatedSummary)
            return res
                .status(401)
                .json({ success: false, message: "Summary not found" });
        res.json({
            success: true,
            message: "Updated!",
            summary: updateSummary,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Delete
router.delete("/:summaryID", verifyJWTandTeacher, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.summaryID };
        const summary = await Summary.findById(postDeleteCondition._id);
        const student = await Student.findById(summary.student_id.toString());
        student.summary = undefined;
        student.save();
        const deletedSummary = await Summary.findOneAndDelete(
            postDeleteCondition
        );
        if (!deletedSummary)
            return res
                .status(401)
                .json({ success: false, message: "Summary not found" });
        res.json({
            success: true,
            message: "Deleted!",
            summary: deletedSummary,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;
