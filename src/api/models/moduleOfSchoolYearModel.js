const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let moduleOfSchoolYearModelSchema = new Schema({
    module_id: {
        type: String,
        required: true
    },
    school_year_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    "ModuleOfSchoolYear",
    moduleOfSchoolYearModelSchema
);

