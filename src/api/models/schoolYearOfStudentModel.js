const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schoolYearOfStudentModel = new Schema({
    student_id: {
        type: String,
        required: true
    },
    schoolYear_id: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('SchoolYearOfStudent', schoolYearOfStudentSchema);