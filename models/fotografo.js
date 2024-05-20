const db = require('../config/config.js');
const bcrypt = require('bcryptjs');

const Fotografo = {};
Fotografo.create = async (fotografo, result) => {
  const hash = await bcrypt.hash(user.password, 10);
  const sql = `
    INSERT INTO fotografo (
      email,
      username,
      adress,
      image,
      password,
      created_at,
      updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      fotografo.email,
      fotografo.username,
      fotografo.adress,
      fotografo.image,
      fotografo.password,
      hash,
      new Date(),
      new Date()
    ], (err, res) => {
      if (err) {
        console.log('Error al crear el usuario: ', err);
        result(err, null);
      } else {
        console.log('Usuario creado: ', {id: res.insertId, ...fotografo

        });

        result(null, {id: res.insertId, ...fotografo });
      }
    }
  );
};

module.exports = Fotografo;
