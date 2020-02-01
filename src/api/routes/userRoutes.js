const user_controller = require('../controllers/userControllers');

module.exports = (app) => {
  app.get('/users/login', user_controller.userLogin);
}