const students_in_schoolyear = require("../controllers/studentInSchoolYearControllers");

module.exports = app => {
    app.route("/student_in_year/")
        .post(students_in_schoolyear.addStudentToSchoolYear)
        .delete(students_in_schoolyear.removeStudentFromSchoolYear)
        .get(/* jwtMiddleware.verify_token, */ students_in_schoolyear.getAllStudentInYear);
    // .patch(/* jwtMiddleware.verify_token, */ note_controllers.updateNote)
    // .delete(/* jwtMiddleware.verify_token, */ note_controllers.deleteNote);
};
