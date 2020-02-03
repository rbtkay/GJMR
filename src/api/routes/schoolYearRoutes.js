const school_year_controller = require("../controllers/schoolYearControllers");

const jwt = require("../middlewares/jwtMiddleware");

module.exports = app => {
    app.route("/school_year/")
        // set ids in body request to have a specific list of school year
        .get(school_year_controller.getSchoolYears)
        .post(school_year_controller.createSchoolYear)
        .delete(school_year_controller.deleteSchoolYear)
        .put(school_year_controller.updateSchoolYear);

    app.route("/school_year/:school_year_id").get(
        school_year_controller.getSchoolYearById
    );
    app.route("/school_year/student/:student_id").get(
        getSchoolYearIdByStudentId
    );
};
