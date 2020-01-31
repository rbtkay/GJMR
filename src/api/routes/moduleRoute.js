
const moduleController = require('../controllers/moduleController');
// const jwtMiddleware = require('../middleware/jwtMiddleware');


module.exports = (app) => {
    app.route('/modules')
        .get(moduleController.get_modules)
        .post(moduleController.create_a_module)

    app.route('/modules/:module_id')
        .get(moduleController.get_a_module)        
}

