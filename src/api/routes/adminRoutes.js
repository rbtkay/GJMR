const admin_controller = require('../controllers/adminControllers');

module.exports = (app) => {
  app.post('/admin/create_user', admin_controller.adminCreateUser);
}