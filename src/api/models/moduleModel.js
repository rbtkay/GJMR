const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ModuleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    teacher_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Module', ModuleSchema);