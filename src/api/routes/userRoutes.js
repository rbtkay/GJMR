const user_controller = require('../controllers/userControllers');
const jwt = require('../middlewares/jwtMiddleware');

module.exports = (app) => {
  app.get('/user/login', user_controller.userLogin);
  app.get('/user/:user_role', user_controller.getUsersByRole);


  app.route('/user')
    .get(jwt.verifyAdminToken, user_controller.getAllUsers)
    .post(jwt.verifyAdminToken, user_controller.createUser)
    .put(jwt.verifyAdminToken, user_controller.updateUser)
    .delete(jwt.verifyAdminToken, user_controller.deleteUser)
}