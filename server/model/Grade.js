const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    grade_name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Grade', gradeSchema)