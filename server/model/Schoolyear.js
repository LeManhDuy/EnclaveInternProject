const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolYearSchema = new Schema({
    schoolyear_name: {
        type: String,
        required: true,
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
});

module.exports = mongoose.model('SchoolYear', schoolYearSchema)