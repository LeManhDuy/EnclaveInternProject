const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    account_username: {
        type: String,
        required: true,
        unique: true,
    },
    account_password: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Account',AccountSchema)