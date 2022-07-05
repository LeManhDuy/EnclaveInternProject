const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    grade_name: {
        type: String,
        required: true,
    },
    grade_subjects: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
    }
});

module.exports = mongoose.model('Grade', gradeSchema)