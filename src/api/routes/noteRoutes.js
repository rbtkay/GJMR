const note_controllers = require("../controllers/noteControllers");

module.exports = app => {
    app.route("/notes/modules").post(note_controllers.getNotesByModulesId);
    app.route("/notes/student/:student_id").get(
        note_controllers.getNotesFromModulesAndStudent
    );
    app.route("/notes/:note_id")
        .get(note_controllers.getNote)
        .post(/* jwtMiddleware.verify_token, */ note_controllers.createNote)
        .patch(/* jwtMiddleware.verify_token, */ note_controllers.updateNote)
        .delete(/* jwtMiddleware.verify_token, */ note_controllers.deleteNote);
};
