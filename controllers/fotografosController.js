const Fotografo = require('../models/fotografo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/key');

module.exports = {
  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
  
    Fotografo.findByEmail(email, async (err, myFotografo) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: 'Error al consultar el usuario',
          error: err
        });
      }
  
      if (!myFotografo) { // Cliente sin autorización para realizar la petición
        return res.status(401).json({
          success: false,
          message: 'El email no existe en la base de datos'
        });
      }
  
      const isPasswordValid = await bcrypt.compare(password, myFotografo.password);
      if (isPasswordValid) {
        const token = jwt.sign({ id: myFotografo.id, email: myFotografo.email }, keys.secretOrKey, {});
        const data = {
          id: myFotografo.id,
          email: myFotografo.email,
          username: myFotografo.username,
          adress: myFotografo.adress,
          image: myFotografo.image,
          session_token: `JWT ${token}`
        };
  
        return res.status(201).json({
          success: true,
          message: 'Usuario autenticado',
          data: data
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Contraseña incorrecta'
        });
      }
    });
  },
  
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
