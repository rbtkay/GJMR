
const moduleController = require('../controllers/moduleController');
// const jwtMiddleware = require('../middleware/jwtMiddleware');

//exporte la fonction anonyme
module.exports = (app) => {
    app.route('/modules')
        .get(moduleController.get_modules);
        
}