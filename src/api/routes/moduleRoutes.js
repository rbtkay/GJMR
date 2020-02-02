
const module_controller = require('../controllers/moduleControllers');
// const jwtMiddleware = require('../middleware/jwtMiddleware');


module.exports = (app) => {
    //app.get('/modules/:user_id', user_controller.getModulesByStudent); //ce route ramenera les modules par etudiant!

    app.route('/modules')
        .get(module_controller.getModule)
        .post(module_controller.createAModule)

}