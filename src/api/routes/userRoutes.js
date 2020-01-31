const userController = require('../controllers/userController');

module.exports = (app) => {
  app.get('/users/login', userController.user_login);
}