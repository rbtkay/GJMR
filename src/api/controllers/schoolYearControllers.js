const SchoolYear = require('../models/schoolYearModel');
const mongoose = require('mongoose');
const { serverError } = require('../functions/errorManagment')

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

    new_school_year.save().then((school_year, error) => {
        res.status(200);
        res.json(school_year);
    }).catch(error => {
        res.status(500)
        res.json({ message: "Erreur serveur." })
    });
}

/**
 * Delete a schoolYear:
 *  body : {
 *      school_year_id (string)
 *  }
 */
exports.deleteSchoolYear = (req, res) => {
    SchoolYear.findByIdAndDelete((req.body.schoolyear_id)).then((result, error) => {
        res.status(200);
        res.json({ message: "schoolyear deleted properly" })
    }).catch(error => { serverError(error, res) });
}

/**
 * gets all schoolyears:
 */
exports.getSchoolYears = (req, res) => {
    SchoolYear.find({}).then((school_years, error) => {
        res.status(200)
        res.json(school_years)
    }).catch(e => {
        serverError(error, res)
    })
}

//update a specific school year
exports.updateSchoolYear = (req, res) => {
    const { schoolyear_id, name, start_date, end_date } = req.body;

    SchoolYear.findByIdAndUpdate(schoolyear_id, { $set: { name, start_date, end_date } })
        .then((result, error) => {
            res.status(200)
            res.json({ message: "schoolyear updated correctly" })
        }).catch(error => {
            serverError(e, res);
        })
}