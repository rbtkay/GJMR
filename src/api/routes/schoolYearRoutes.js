const school_year_controller = require('../controllers/schoolYearControllers');
const jwt = require('../middlewares/jwtMiddleware');

module.exports = (app) => {
    app.route('/schoolyear/')
        .post(school_year_controller.createSchoolYear)
        .delete(school_year_controller.deleteSchoolYear)
        .get(school_year_controller.getSchoolYears)
        .put(school_year_controller.updateSchoolYear)

    //   app.route(jwt.verify_administrator_token, '/admin/user')
    //     .get(user_controller.getAllUsers)
    //     .post(user_controller.createUser)
    //     .put(user_controller.updateUser)
    // .delete(user_controller.deleteUser)
}