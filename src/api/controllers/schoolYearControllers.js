const SchoolYear = require('../models/schoolYearModel');
const mongoose = require('mongoose');

/*Create a new SchoolYear
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
*/
exports.createSchoolYear = (req, res) => {
    let new_school_year = new SchoolYear(req.body);

    try {
        new_school_year.save((error, school_year).then(() => {
            res.status(200);
            res.json(school_year);
        }).catch(error => {
            res.status(500);
            res.json({ message: "Erreur serveur." });
        })
}