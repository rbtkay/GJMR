// modules
const mongoose = require("mongoose");
// schema
const SchoolYear = require("../models/schoolYearModel");
const SchoolYearOfStudent = require("../models/schoolYearOfStudentModel");
// functions
const {
    requestManagment,
    serverError
} = require("../functions/errorManagment");

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

    new_school_year
        .save()
        .then((school_year, error) => {
            response.status(201);
            response.json(school_year);
        })
        .catch(error => {
            response.status(500);
            response.json({ message: "Erreur serveur." });
        });
};

/**
 * Delete a schoolYear:
 *  body : {
 *      school_year_id (string)
 *  }
 */
exports.deleteSchoolYear = (request, response) => {
    SchoolYear.findByIdAndDelete(request.params.school_year_id)
        .then((result, error) => {
            response.status(200);
            response.json({ message: "school_year deleted properly" });
        })
        .catch(error => {
            serverError(error, response);
        });
};

/**
 * gets all school_years:
 */
exports.getSchoolYears = (request, response) => {
    SchoolYear.find()
        .then((school_years, error) => {

            result = school_years.map(year => {
                year = {
                    _id: year._id,
                    name: year.name,
                    start_date: year.start_date.toString().split("00:00:00")[0],
                    end_date: year.end_date.toString().split("00:00:00")[0]
                };
                return year
            })

            response.status(200);

            response.json(result);
        })
        .catch(e => {
            serverError(e, response);
        });
};

//update a specific school year
exports.updateSchoolYear = (request, response) => {
    const { school_year_id, name, start_date, end_date } = request.body;

    SchoolYear.findByIdAndUpdate(school_year_id, {
        $set: { name, start_date, end_date }
    })
        .then((result, error) => {
            response.status(200);
            response.json({ message: "school_year updated correctly" });
        })
        .catch(error => {
            serverError(e, response);
        });
};

exports.getSchoolYearById = (request, response) => {
    SchoolYear.findById(request.params.school_year_id)
        .then((year, error) => {
            const result = {
                _id: year._id,
                name: year.name,
                start_date: year.start_date.toString().split("00:00:00")[0],
                end_date: year.end_date.toString().split("00:00:00")[0]
            };

            response.status(200);

            response.json(result);
        })
        .catch(error => serverError(error, response));
};

exports.getSchoolYearIdByStudentId = (request, response) => {
    SchoolYearOfStudent.findOne({
        student_id: request.params.student_id
    })
        .then((result, error) =>
            requestManagment(response, result, error, "Etudiant introuvable.")
        )
        .catch(error => serverError(error, response));
};
