const Fotografo = require('../models/fotografo');

module.exports = {
  register(req, res) {
    const fotografo = req.body; // Datos del cliente
    Fotografo.create(fotografo, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error al crear el usuario',
          error: err
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Creado el usuario',
        data: data // Id del usuario creado
      });
    });
  }
};
