const user_controller = require("../controllers/userControllers");
const jwt = require("../middlewares/jwtMiddleware");

module.exports = app => {
    app.route("/user")
        // set ids in body request to have a specific list of users
        .get(jwt.verifyAdminToken, user_controller.getUsers)
        .post(jwt.verifyAdminToken, user_controller.createUser)
        .put(jwt.verifyAdminToken, user_controller.updateUser)
        .delete(jwt.verifyAdminToken, user_controller.deleteUser);
    app.post("/user/login", user_controller.userLogin);
    app.get("/user/:user_id", user_controller.getUserById);
    app.post("/users", user_controller.getUsersById);
    app.get("/users/role/:user_role", user_controller.getUsersByRole);
    app.post("/teachers_by_modules", user_controller.getTeachersByModules);
};
