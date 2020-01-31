const adminController = require('../controllers/adminController');

module.exports = (app) => {
  app.post('/admin/create_user', adminController.admin_create_user);
}