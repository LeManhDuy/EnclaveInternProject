const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parentsSchema = new Schema({
    parent_name: {
        type: String,
        require: true,
    },
    parent_dateofbirth: {
        type: Date,
        require: false,
    },
    parent_address: {
        type: String,
        require: true,
    },
    parent_phone: {
        type: String,
        require: true,
    },
    // parent_email: {
    //     type: String,
    //     require: false,
    // },
    parent_job: {
        type: String,
        require: false,
    },
    parent_gender: {
        type: Boolean,
        require: true,
        default: false,
    },
})

module.exports = mongoose.model('Parents', parentsSchema)