const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    class_name: {
        type: String,
        required: true,
    },
    teacher_id: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    grade_id: {
        type: Schema.Types.ObjectId,
        ref: 'Grade'
    }
});

module.exports = mongoose.model('Class', classSchema)