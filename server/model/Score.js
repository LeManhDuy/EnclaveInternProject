const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    score_ratio1: {
        type: [Number],
        required: true,
    },
    score_ratio2: {
        type: [Number],
        required: true,
    },
    score_ratio3: {
        type: Number,
        required: true,
    },
    score_average: {
        type: Number,
        required: true,
    },
    //1 score 1 student
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
});

module.exports = mongoose.model('Score', scoreSchema)