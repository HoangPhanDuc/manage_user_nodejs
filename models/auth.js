const sql = require("msnodesqlv8");
const config = require("../database/database");

exports.auth = (name) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM admin WHERE name = ?";
    sql.query(config, query, [name], (err, result) => {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

exports.validate = (name) => {
  return new Promise((resolve, reject) => {
    const validate = "SELECT DISTINCT * FROM admin WHERE name = ?";
    sql.query(config ,validate, [name], (err, result) => {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

exports.reg = (name, password, token) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO admin (name, password, token) VALUES(?, ?, ?)";
    sql.query(config, query, [name, password, token], (err, result) => {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve(result);
      }
    });
  });
};
