// controller
const studentController = require("../controllers/studentControllers");

module.exports = app => {
    app.route("/students").get(studentController.getStudents);
    app.route("/students/:student_id").get(studentController.getStudent);
    app.route("/students/:student_id/modules").get(
        studentController.getStudentModules
    );
};
