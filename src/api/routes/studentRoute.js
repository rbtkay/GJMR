//src/api/routes/studentRoute.js

const studentController = require('../controllers/studentController');

// Exporte la fonction anonyme
module.exports = (app) => {
    app.route('/students/:student_id/modules')
        .get(studentController.getStudentModules)


    app.route('/students/:student_id/school_year/')
        .get(studentController.getSchoolYearOfStudent)

    //app.route('/students/:student_id/schoolYear/:school_year_id/modules')
    //.get(studentSchoolYear.getStudentModulesOfSchoolYear);

    //app.route('/students/schoolYear/')
    // .get(studentController.getYearOfStudent);


}