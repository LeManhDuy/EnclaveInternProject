const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const summaryScoreSchema = new Schema({
    summary_behavior: {
        type: String,
        required: true,
    },
    summary_score: {
        type: Number,
        required: true,
    },
    student_id: {
        type: Schema.Types.ObjectId,
        ref: "Student",
    },
});

module.exports = mongoose.model("SummaryScore", summaryScoreSchema);
