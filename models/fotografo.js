const db = require('../config/config.js');

const Fotografo = {};

Fotografo.create = (fotografo, result) => {
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
      new Date(),
      new Date()
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('Id del nuevo Usuario: ', res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

module.exports = Fotografo;
