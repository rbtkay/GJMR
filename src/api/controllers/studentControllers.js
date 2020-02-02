// modules
const mongoose = require("mongoose");
// schema
const User = require("../models/userModel");
const SchoolYearOfStudent = require("../models/schoolYearOfStudentModel");
// functions
const {
    getModulesById,
    getModulesIdFromSchoolYear
} = require("../internal_request/moduleRequests");
const { getTeachersById } = require("../internal_request/teacherRequests");
const {
    getNotesFromModulesAndStudent
} = require("../internal_request/noteRequests");
const {
    requestManagment,
    requestManagmentPromise,
    serverError
} = require("../functions/errorManagment");

exports.getStudents = (request, response) => { //FIXME: cette fonction est redundant, cest la meme que getAllUsers dans userControllers
    User.find()
        .then((student, error) =>
            requestManagment(
                response,
                student,
                error,
                "Il n'y a aucun étudiant."
            )
        )
        .catch(error => serverError(error, response));
};

exports.getStudent = (request, response) => { //FIXME: cette fonction est redundant, cest la meme que getUserById dans userControllers
    User.findById(request.params.student_id)
        .then((student, error) =>
            requestManagment(
                response,
                student,
                error,
                "Utilisateur introuvable."
            )
        )
        .catch(error => serverError(error, response));
};

exports.getStudentModules = (request, response) => { //FIXME: cette fonction devrait etre dans le controller de module et sappele getModuleByStudent
    let send_response = {};

    SchoolYearOfStudent.findOne({
        student_id: request.params.student_id
    })
        .then((result, error) =>
            requestManagmentPromise(
                response,
                result,
                error,
                "Utilisateur introuvable."
            ).then(() => {
                let { school_year_id } = JSON.parse(result);
                let modules_id = getModulesIdFromSchoolYear(
                    school_year_id,
                    response
                );
                if (!modules_id) return;
                send_response.modules = getModulesById(modules_id, response);
                let teachers_id = send_response.modules.map(
                    module => module.teacher_id
                );
                send_response.teachers = getTeachersById(teachers_id, response);
                send_response.notes = getNotesFromModulesAndStudent(
                    modules_id,
                    request.params.student_id,
                    response
                );
                response.json(send_response);
                /* 
                TODO : set it to React
                modules = modules.map(module => {
                    module.teacher = teachers.filter(
                        teacher => teacher.teacher_id === module.teacher_id
                    )[0];
                    module.note = notes.filter(
                        note => note.module_id === module.module_id
                    )[0];
                    return module;
                }); 
                */
            })
        )
        .catch(error => serverError(error, response));
};
