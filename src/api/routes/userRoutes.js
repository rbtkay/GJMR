const user_controller = require('../controllers/userControllers');
const jwt = require('../middlewares/jwtMiddleware');

module.exports = (app) => {
  app.get('/users/login', user_controller.userLogin);
  app.get('/users/:user_role', user_controller.getUsers);

  app.route(jwt.verify_administrator_token, '/admin/user')
    .get(user_controller.getAllUsers)
    .post(user_controller.createUser)
    .put(user_controller.updateUser)
    .delete(user_controller.deleteUser)
}