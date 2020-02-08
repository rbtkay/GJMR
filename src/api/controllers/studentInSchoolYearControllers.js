const mongoose = require("mongoose");

const SchoolYearOfStudentSchema = require('../models/schoolYearOfStudentModel');
const UserSchema = require('../models/userModel');
const { requestManagment, serverError } = require("../functions/errorManagment");

/*
    new_student:{
        user_id: string
        school_year_id: string,
    }
    adds a student to a year
*/
exports.addStudentToSchoolYear = (new_student) => {
    return new Promise((resolve, reject) => {
        console.log(new_student)

        let new_student_in_schoolyear = new SchoolYearOfStudentSchema(new_student);

        new_student_in_schoolyear.save((error, result) => {
            if (!!error) {
                reject(false)// serverError(error, response);
            } else {
                // response.status(200);
                // response.json(result);
                resolve(true)
            }
        });
    })
}
/*
    body:{
        user_id: string
        school_year_id: string,
    }
    removes a student from a year
*/
exports.removeStudentFromSchoolYear = (request, response) => {
    SchoolYearOfStudentSchema.findOneAndDelete({ user_id: request.body.student_id, school_year_id: request.body.school_year_id }).then((result) => {
        response.status(200);
        response.json({ message: "Document deleted" });
    }).catch(e => {
        serverError(error, response);
    })
}
/*
    body:{
        school_year_id: string,
    }
    returns all student in a year
*/
exports.getAllStudentInYear = (request, response) => {
    SchoolYearOfStudentSchema.find({ school_year_id: request.body.school_year_id }).then((result) => {

        console.log(result);
        if (result.length <= 0) {
            response.status(404);
            response.json({ message: "pas d'eleves trouve pour cette annee" });
        }

        var resultIds = result.map(item => {
            return mongoose.Types.ObjectId(item.student_id)
        });

        UserSchema.find({
            '_id': {
                $in: resultIds
            }
        }).then(students => {
            console.log(resultIds)
            response.status(200);
            response.json(students);
        })
    }).catch(e => {
        serverError(e, response);
    })
}