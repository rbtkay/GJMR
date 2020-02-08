const module_in_schoolyear_controller = require("../controllers/moduleOfSchoolYearControllers");

module.exports = app => {
    app.route("/module_in_schoolyear/")
        .post(module_in_schoolyear_controller.addModuleToSchoolYear)
        .delete(module_in_schoolyear_controller.removeModuleFromSchoolYear);
    app.route("/module_in_schoolyear/:school_year_id")
        .get(/* jwtMiddleware.verify_token, */ module_in_schoolyear_controller.getModulesInYear);
    // .patch(/* jwtMiddleware.verify_token, */ note_controllers.updateNote)
    // .delete(/* jwtMiddleware.verify_token, */ note_controllers.deleteNote);
};
