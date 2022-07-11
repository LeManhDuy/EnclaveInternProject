const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    grade_name: {
        type: String,
        required: true,
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject',
    }],
    subjects_name: [{
        type: Schema.Types.String,
        ref: 'Subject'
    }],
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }]
});

module.exports = mongoose.model('Grade', gradeSchema)