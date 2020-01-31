const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ModuleSchema = new Schema({
    module_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    teacher_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Module', ModuleSchema);