const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema({
    schedule_link: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('Schedule', scheduleSchema)