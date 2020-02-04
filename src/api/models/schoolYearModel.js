const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schoolYearSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('SchoolYear', schoolYearSchema);