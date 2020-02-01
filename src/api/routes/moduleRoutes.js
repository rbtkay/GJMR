
const module_controller = require('../controllers/moduleControllers');
// const jwtMiddleware = require('../middleware/jwtMiddleware');


module.exports = (app) => {
    app.route('/modules')
        .get(module_controller.getModule)
        .post(module_controller.createAModule)
        
}