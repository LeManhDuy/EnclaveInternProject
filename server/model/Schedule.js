const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema({
    schedule_link: {
        type: String,
        require: true,
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }
})

module.exports = mongoose.model('Schedule', scheduleSchema)