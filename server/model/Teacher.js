const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    teacher_img: {
        type: String,
        require: false,
    },
    teacher_class: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
    notifications: [
        {
            type: Schema.Types.ObjectId,
            ref: "Notification",
        },
    ],
});

module.exports = mongoose.model("Teacher", teacherSchema);
