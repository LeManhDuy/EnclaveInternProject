const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subject_name: {
        type: String,
        required: true,
    },
    subject_ratio: {
        type: Float32Array,
        required: true,
    },
    grade_id: {
        type: Schema.Types.ObjectId,
        ref: 'Grade'
    }
});

module.exports = mongoose.model('Subject', subjectSchema)