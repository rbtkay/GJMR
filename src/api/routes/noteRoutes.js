const note_controllers = require("../controllers/noteControllers");
const jwt = require("../middlewares/jwtMiddleware");

module.exports = app => {
    app.route("/notes/modules").post(note_controllers.getNotesByModulesId);
    app.route("/notes/student/:student_id").post(
        note_controllers.getNotesFromModulesAndStudent
    );
    app.route("/notes")
        .get(jwt.verifyToken, note_controllers.getNotes)
        .post(jwt.verifyStudentToken, note_controllers.createNote)
        .patch(jwt.verifyStudentToken, note_controllers.updateNote);
    app.route("/notes/:note_id")
        .get(note_controllers.getNote)
        .delete(/* jwtMiddleware.verify_token, */ note_controllers.deleteNote);
};
