const fotografosController = require('../controllers/fotografosController');
module.exports = (app) => {
    app.post('/api/fotografo/create', fotografosController.register);
    app.post('/api/fotografo/login', fotografosController.login);
}