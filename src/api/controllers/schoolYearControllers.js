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
exports.createSchoolYear = (request, response) => {
    let new_school_year = new SchoolYear(request.body);

    new_school_year.save().then((school_year, error) => {
        response.status(200);
        response.json(school_year);
    }).catch(error => {
        response.status(500)
        response.json({ message: "Erreur serveur." })
    });
}

/**
 * Delete a schoolYear:
 *  body : {
 *      school_year_id (string)
 *  }
 */
exports.deleteSchoolYear = (request, response) => {
    SchoolYear.findByIdAndDelete((request.body.schoolyear_id)).then((result, error) => {
        response.status(200);
        response.json({ message: "schoolyear deleted properly" })
    }).catch(error => { serverError(error, response) });
}

/**
 * gets all schoolyears:
 */
exports.getSchoolYears = (request, response) => {
    SchoolYear.find({}).then((school_years, error) => {
        response.status(200)
        response.json(school_years)
    }).catch(e => {
        serverError(error, response)
    })
}

//update a specific school year
exports.updateSchoolYear = (request, response) => {
    const { schoolyear_id, name, start_date, end_date } = request.body;

    SchoolYear.findByIdAndUpdate(schoolyear_id, { $set: { name, start_date, end_date } })
        .then((result, error) => {
            response.status(200)
            response.json({ message: "schoolyear updated correctly" })
        }).catch(error => {
            serverError(e, response);
        })
}