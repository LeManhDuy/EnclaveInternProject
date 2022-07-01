const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    score_ratio1: {
        type: Float32Array,
        required: true,
    },
    score_ratio2: {
        type: Float32Array,
        required: true,
    },
    score_ratio3: {
        type: Float32Array,
        required: true,
    },
    score_average: {
        type: Float32Array,
        required: true,
    },
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    schoolyear_id: {
        type: Schema.Types.ObjectId,
        ref: 'Schoolyear'
    }
});

module.exports = mongoose.model('score', scoreSchema)