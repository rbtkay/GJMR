// schema
const Note = require("../models/noteModel");
// fucntions
const { serverError } = require("../functions/errorManagment");

exports.getNotesFromModulesAndStudent = (modules_id, student_id, response) => {
    Note.find({
        module_id: { $in: modules_id },
        student_id
    })
        // Not use request managment cause a module can have no note
        .then((notes, error) => {
            if (error) {
                response.status(400);
                console.log(error);
                response.json("Une erreur est survenue");
            } else if (!notes) {
                response.json(null);
            } else {
                response.status(200);
                response.json(result);
            }
        })
        .catch(error => serverError(error, response));
};
