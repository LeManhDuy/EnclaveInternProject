const express = require("express");
const router = express.Router();
const Grades = require("../model/Grade");
const Classes = require("../model/Class");
const Subjects = require("../model/Subject");
const verifyJWTandAdmin = require("../middleware/verifyJWTandAdmin");

// Create
router.post("/", verifyJWTandAdmin, async (req, res) => {
    const { grade_name } = req.body;
    try {
        // Validate
        const gradeValidate = await Grades.findOne({ grade_name: grade_name });
        if (gradeValidate) {
            return res
                .status(400)
                .json({ success: false, message: "Grade name is existing" });
        }
        const newGrade = new Grades({
            grade_name: grade_name,
        });
        await newGrade.save();
        res.json({ success: true, message: "Create grade successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Get
router.get("/", verifyJWTandAdmin, async (req, res) => {
    try {
        // Return token
        const allGrades = await Grades.find({});
        res.json({ success: true, allGrades });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Get by id
router.get("/:gradeID", verifyJWTandAdmin, async (req, res) => {
    try {
        // Return token
        const grades = await Grades.findById(req.params.gradeID);
        res.json({ success: true, grades });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Update
router.put("/:gradeID", verifyJWTandAdmin, async (req, res) => {
    const { grade_name } = req.body;
    try {
        // Validate
        const gradeValidate = await Grades.findOne({ grade_name: grade_name });
        if (gradeValidate) {
            return res
                .status(400)
                .json({ success: false, message: "Grade name is existing" });
        }
        let updateGrade = {
            grade_name,
        };
        const postUpdateCondition = { _id: req.params.gradeID };
        updatedGrade = await Grades.findOneAndUpdate(
            postUpdateCondition,
            updateGrade,
            { new: true }
        );

        if (!updatedGrade)
            return res
                .status(401)
                .json({ success: false, message: "Grade not found" });
        res.json({ success: true, message: "Updated!", grade: updateGrade });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// Delete
router.delete("/:gradeID", verifyJWTandAdmin, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.gradeID };
        const grade = await Grades.findById(postDeleteCondition._id);
        const allClasses = await Classes.find({
            grade_id: postDeleteCondition._id,
        });
        const allSubjects = await Subjects.find({
            grade_id: postDeleteCondition._id,
        });
        allSubjects.map((item) => {
            item.grade_id = undefined;
            item.grade_name = undefined;
            item.save();
        });
        allClasses.map((item) => {
            item.grade_id = undefined;
            item.grade_name = undefined;
            item.save();
        });
        if (!grade) {
            return res.status(401).json({
                success: false,
                message: "Grade not found!",
            });
        }

        const deletedGrade = await Grades.findOneAndDelete(postDeleteCondition);

        if (!deletedGrade)
            return res
                .status(401)
                .json({ success: false, message: "Grade not found" });
        res.json({ success: true, message: "Deleted!", grade: deletedGrade });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;
