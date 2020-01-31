const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schoolYearSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('SchoolYear', schoolYearSchema);