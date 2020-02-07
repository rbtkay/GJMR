const module_controller = require("../controllers/moduleControllers");
// const jwtMiddleware = require('../middleware/jwtMiddleware');

module.exports = app => {
    app.route("/modules")
        .get(module_controller.getModules)
        .post(module_controller.createModule);
        
    app.route("/modules/teachers/:teacher_id")
        .get(module_controller.getModulesByTeacher);

    app.route("/modules/school_year/:school_year_id")
    .get(module_controller.getModulesIdBySchoolYearId);

    app.route("/modules/:module_id")
        .get(module_controller.getModuleById)
        .put(module_controller.updateModule)
        .delete(module_controller.deleteModule);

};
