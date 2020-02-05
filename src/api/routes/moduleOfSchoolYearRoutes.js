const modulle_of_school_year_controllers = require("../controllers/moduleOfSchoolYearControllers");
// const jwtMiddleware = require('../middleware/jwtMiddleware');

module.exports = app => {
    app.route("/modules")
        .get(modulle_of_school_year_controllers.getModulesOfSchoolYear)
        .post(modulle_of_school_year_controllers.createModulesOfSchoolYear);

   
        
};
