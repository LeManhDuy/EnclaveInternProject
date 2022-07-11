const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privateNotificationSchema = new Schema({
    notification_title: {
        type: String,
        required: true,
    },
    notification_date: {
        type: String,
        required: true,
    },
    notification_content: {
        type: String,
        required: true,
    },
    is_completed: {
        type: Boolean,
        required: true,
        default: false
    },
    teacher_id: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
});

module.exports = mongoose.model('PrivateNotification', privateNotificationSchema)