const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    admin_username: {
        type: String,
        required: true,
        unique: false,
    },
    admin_password: {
        type: String,
        required: true,
    },
    admin_email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Admin", adminSchema);
