const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let teacherModuleOfSchoolYearSchema = new Schema({
    teacher_id: {
        type: String,
        required: true
    },
    module_id: {
        type: String,
        required: true
    },
    schoolYear_id: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('teacherModuleOfSchoolYear', teacherModuleOfSchoolYearSchema);