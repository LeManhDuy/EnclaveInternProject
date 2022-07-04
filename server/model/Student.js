const mongoose = require('mongoose');
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
    student_behavior: {
        type: String,
        required: true,
    },
    teacher_id: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    class_id: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    },
    score_id: {
        type: Schema.Types.ObjectId,
        ref: 'Score'
    },
    schoolyear_id: {
        type: Schema.Types.ObjectId,
        ref: 'Schoolyear'
    }
});

module.exports = mongoose.model('Student', studentSchema)