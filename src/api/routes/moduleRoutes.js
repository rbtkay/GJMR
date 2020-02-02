const module_controller = require("../controllers/moduleControllers");
// const jwtMiddleware = require('../middleware/jwtMiddleware');

module.exports = app => {
    app.route("/modules")
        .get(module_controller.getModule)
        .post(module_controller.createAModule);

    app.route("/modules/:module_id")
        .get(module_controller.get_a_module)
        .put(module_controller.update_a_module)
        .delete(module_controller.delete_a_module);

    app.route("/modules/school_year/:school_year_id").get(
        module_controller.getModulesIdBySchoolYear
    );
};
