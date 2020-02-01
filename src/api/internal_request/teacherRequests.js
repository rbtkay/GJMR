// schema
const User = require("../models/userModel");
// fucntions
const {
    requestManagment,
    serverError
} = require("../functions/errorManagment");

exports.getTeacherById = (teacher_id, response) => {
    User.find({ teacher_id })
        .then((teacher, error) =>
            requestManagment(
                response,
                teacher,
                error,
                "Intervenant introuvable."
            )
        )
        .catch(error => serverError(error, response));
};

exports.getTeachersById = (teachers_id, response) => {
    User.find({
        teacher: {
            $in: teachers_id
        }
    })
        .then((teachers, error) =>
            requestManagment(
                response,
                teachers,
                error,
                "Aucun intervenant trouvé."
            )
        )
        .catch(error => serverError(error, response));
};
