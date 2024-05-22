const db = require('../config/config.js');
const bcrypt = require('bcryptjs');

const Fotografo = {};

Fotografo.findById = (id, result) => {
  const sql = `SELECT id, email, username, adress, image, password FROM fotografo WHERE id = ?`;
  db.query(sql, [id], (err, fotografo) => {
    if (err) {
      console.log('Error al consultar: ', err);
      result(err, null);
    } else {
      console.log('Usuario consultado: ', fotografo[0]);
      result(null, fotografo[0]);
    }
  });
};

Fotografo.findByEmail = (email, result) => {
  const sql = `SELECT id, email, username, adress, image, password FROM fotografo WHERE email = ?`;
  db.query(sql, [email], (err, fotografo) => {
    if (err) {
      console.log('Error al consultar: ', err);
      result(err, null);
    } else {
      console.log('Usuario consultado: ', fotografo[0]);
      result(null, fotografo[0]);
    }
  });
};



Fotografo.create = async (fotografo, result) => {
  const hash = await bcrypt.hash(fotografo.password, 10);
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
      hash,
      new Date(),
      new Date()
    ], (err, res) => {
      if (err) {
        console.log('Error al crear el usuario: ', err);
        result(err, null);
      }
      else {
        console.log('Usuario creado: ', {id: res.insertId, ...fotografo

        });

        result(null, {id: res.insertId, ...fotografo });
      }
    }
  );
};

module.exports = Fotografo;
