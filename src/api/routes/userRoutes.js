const user_controller = require("../controllers/userControllers");
const jwt = require("../middlewares/jwtMiddleware");

module.exports = app => {
    app.route("/user")
        // set ids in body request to have a specific list of users 
        .get(user_controller.getUsers)
        .post(jwt.verifyAdminToken, user_controller.createUser)
        .put(jwt.verifyAdminToken, user_controller.updateUser);

    app.post("/user/login", user_controller.userLogin);
    app.route("/user/:user_id")
        .get(user_controller.getUserById)
        .delete(jwt.verifyAdminToken, user_controller.deleteUser);
    app.post("/users", user_controller.getUsersById);
    app.get("/users/role/:user_role", user_controller.getUsersByRole);
    app.post("/teachers_by_modules", user_controller.getTeachersByModules);
};
