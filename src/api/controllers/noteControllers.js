// src/api/controllers/noteControllers.js
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
                response.json({ message: "Note introuvable" });
            } else {
                response.status(200);
                response.json(note);
            }
        })
        .catch(error => {
            response.status(500);
            console.log(error);
            response.json({ message: "Erreur serveur" });
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
                response.json({ message: "Il manque des informations" });
            } else {
                response.status(201);
                response.json(note);
            }
        })
        .catch(error => {
            response.status(500);
            console.log(error);
            response.json({ message: "Erreur serveur" });
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
    Note.findByIdAndUpdate(request.params.note_id, request.body, { new: true })
        .then((error, note) => {
            if (error) {
                response.status(400);
                console.log(error);
                response.json({ message: "Note introuvable" });
            } else {
                response.status(200);
                response.json(note);
            }
        })
        .catch(error => {
            response.status(500);
            console.log(error);
            response.json({ message: "Erreur serveur" });
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
                response.json({ message: "Note introuvable" });
            } else {
                response.status(200);
                response.json({ message: "Note supprimée" });
            }
        })
        .catch(error => {
            response.status(500);
            console.log(error);
            response.json({ message: "Erreur serveur" });
        });
};
