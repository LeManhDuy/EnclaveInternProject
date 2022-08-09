const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const protectorSchema = new Schema({
    protector_name: {
        type: String,
        require: true,
    },
    protector_address: {
        type: String,
        require: true,
    },
    protector_phone: {
        type: String,
        require: true,
    },
    protector_relationship: {
        type: String,
        require: true,
    },
    protector_img: {
        type: String,
        require: false,
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: "Parent",
    },
});

module.exports = mongoose.model("Protector", protectorSchema);
