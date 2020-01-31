// src/api/routes/noteRoutes.js
const noteControllers = require("../controllers/noteControllers");

module.exports = app => {
    app.route("/notes/:note_id")
        .get(noteControllers.getNote)
        .post(/* jwtMiddleware.verify_token, */ noteControllers.createNote)
        .patch(/* jwtMiddleware.verify_token, */ noteControllers.updateNote)
        .delete(/* jwtMiddleware.verify_token, */ noteControllers.deleteNote);
};
