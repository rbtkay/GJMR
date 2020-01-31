const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NoteSchema = new Schema({
    value: {

        type: Number,
        required: true
    },
    student_id: {
        type: String,
        required: true
    },
    module_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    }
});

mongoose.model("Note", NoteSchema);
module.exports = mongoose.model("Note");
