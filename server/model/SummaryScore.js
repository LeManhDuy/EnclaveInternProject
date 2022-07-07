const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summaryScoreSchema = new Schema({
    teacher_id: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    summary_behavior: {
        type: String,
        required: true,
    },
    summary_score: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('SummaryScore', summaryScoreSchema)