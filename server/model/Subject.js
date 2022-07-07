const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subject_name: {
        type: String,
        required: true,
    },
    subject_ratio: {
        type: Number,
        required: true,
    },
    grade_id: {
        type: Schema.Types.ObjectId,
        ref: 'Grade'
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    students_name: [{
        type: Schema.Types.String,
        ref: 'Student'
    }],
    score_id: {
        type: Schema.Types.ObjectId,
        ref: 'Score'
    }
});

module.exports = mongoose.model('Subject', subjectSchema)