const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacherSchema = new Schema({
    teacher_name: {
        type: String,
        require: true,
    },
    teacher_age: {
        type: Number,
        require: true,
    },
    teacher_email: {
        type: String,
        require: true,
    },
    teacher_password: {
        type: String,
        require: true,
    },
    teacher_gender: {
        type: Boolean,
        require: true,
    },
    teacher_phone: {
        type: String,
        require: true,
    },
    is_main_teacher: {
        type: Boolean,
        require: true,
        default: false,
    },
    is_user_teacher: {
        type: Boolean,
        require: true,
        default: true,
    },
    teacher_class: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }
})

module.exports = mongoose.model('Teacher', teacherSchema)