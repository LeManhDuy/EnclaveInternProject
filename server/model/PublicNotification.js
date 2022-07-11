const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicNotificationSchema = new Schema({
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
        required: true
    }
});

module.exports = mongoose.model('PublicNotification', publicNotificationSchema)