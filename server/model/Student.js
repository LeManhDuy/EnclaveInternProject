const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    student_fullname: {
        type: String,
        required: true,
    },
    student_age: {
        type: Number,
        required: true,
    },
    student_gender: {
        type: Boolean,
        required: true,
    },
    student_image: {
        type: String,
        required: true,
    },
    teacher_id: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
    },
    class_id: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject",
        },
    ],
    summary: {
        type: Schema.Types.ObjectId,
        ref: "SummaryScore",
    },
    schoolyears: [
        {
            type: Schema.Types.ObjectId,
            ref: "Schoolyear",
        },
    ],
});

module.exports = mongoose.model("Student", studentSchema);
