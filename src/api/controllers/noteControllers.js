const mongoose = require("mongoose");
const Note = require("../models/noteModel");

/**
 * Get a Note with :
 *  note_id (int)
 */
exports.getNote = (request, response) => {
    Note.findById(request.params.note_id)
        .then((error, note) => {
            if (error) {
                response.status(400);
                console.log(error);
                response.json({
                    message: "Note introuvable"
                });
            } else {
                response.status(200);
                response.json(note);
            }
        })
        .catch(error => {
            response.status(500);
            console.log(error);
            response.json({
                message: "Erreur serveur"
            });
        });
};

/**
 * Create a Note with :
 *  body : {
 *      value (number)
 *      module_id (number)
 *      student_id (number)
 *      comment (string)
 *
 *  }
 */
exports.createNote = (request, response) => {
    new Note(request.body)
        .save()
        .then((error, note) => {
            if (error) {
                response.status(400);
                console.log(error);
                response.json({
                    message: "Il manque des informations"
                });
            } else {
                response.status(201);
                response.json(note);
            }
        })
        .catch(error => {
            response.status(500);
            console.log(error);
            response.json({
                message: "Erreur serveur"
            });
        });
};

/**
 * Update value and comment of a Note with :
 *  note_id (int)
 *  body : {
 *      value (number)
 *      comment (string)
 *  }
 */
exports.updateNote = (request, response) => {
    Note.findByIdAndUpdate(request.params.note_id, request.body, {
        new: true
    })
        .then((error, note) => {
            if (error) {
                response.status(400);
                console.log(error);
                response.json({
                    message: "Note introuvable"
                });
            } else {
                response.status(200);
                response.json(note);
            }
        })
        .catch(error => {
            response.status(500);
            console.log(error);
            response.json({
                message: "Erreur serveur"
            });
        });
};

/**
 * Delete a Note with :
 *  note_id (int)
 */
exports.deleteNote = (request, response) => {
    Note.findByIdAndRemove(request.params.note_id)
        .then(error => {
            if (error) {
                response.status(400);
                console.log(error);
                response.json({
                    message: "Note introuvable"
                });
            } else {
                response.status(200);
                response.json({
                    message: "Note supprimée"
                });
            }
        })
        .catch(error => {
            response.status(500);
            console.log(error);
            response.json({
                message: "Erreur serveur"
            });
        });
};

/**
 * Recuperer les notes en fonction de modules
 *  body : {
 *      modules_id (int)
 *  }
 */
exports.getNotesByModulesId = (request, response) => {
    Note.find({
        module_id: {
            $in: request.body.modules_id
        }
    })
        .then((notes, error) =>
            requestManagment(
                response,
                notes,
                error,
                "Aucune note n'a été trouvée."
            )
        )
        .catch(error => serverError(error, response));
};

/**
 * Get a Notes from students for modules :
 *  student_id (int)
 *  body : {
 *      modules_id (int)
 *  }
 */
exports.getNotesFromModulesAndStudent = (request, response) => {
    Note.find(
        request.body.modules_id
            ? {
                  module_id: { $in: request.body.modules_id },
                  student_id: request.params.student_id
              }
            : { student_id: request.params.student_id }
    )
        .then((modules, error) => {
            requestManagment(
                response,
                modules,
                error,
                "Aucun note n'a été trouvé."
            );
        })
        .catch(error => serverError(error, response));
};
