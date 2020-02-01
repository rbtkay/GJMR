// // const admin_controller = require('../controllers/adminControllers');
// const jwt = require('../middlewares/jwtMiddleware');

// module.exports = (app) => {
//   app.route('/admin/user')
//     .post(admin_controller.adminCreateUser)
//     .put(admin_controller.adminUpdateUser)
//     .delete(admin_controller.adminDeleteUser)
//     .get(jwt.verify_administrator_token, admin_controller.adminGetUsers)
// }