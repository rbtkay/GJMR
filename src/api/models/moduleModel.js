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
    prof_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Module', ModuleSchema);