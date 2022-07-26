const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    student_fullname: {
        type: String,
        required: true,
    },
    student_dateofbirth: {
        type: Date,
        required: true,
    },
    student_gender: {
        type: Boolean,
        required: true,
    },
    student_image: {
        type: String,
        required: false,
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: "Parents",
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
    scores: [{
        type: Schema.Types.ObjectId,
        ref: "Subject",
    }],
    summary: {
        type: Schema.Types.ObjectId,
        ref: "SummaryScore",
    },
});

module.exports = mongoose.model("Student", studentSchema);
