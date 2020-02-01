// src/api/routes/noteRoutes.js
const note_controllers = require("../controllers/noteControllers");

module.exports = app => {
    app.route("/notes/:note_id")
        .get(note_controllers.getNote)
        .post(/* jwtMiddleware.verify_token, */ note_controllers.createNote)
        .patch(/* jwtMiddleware.verify_token, */ note_controllers.updateNote)
        .delete(/* jwtMiddleware.verify_token, */ note_controllers.deleteNote);
};
