const sql = require("msnodesqlv8");
const config = require("../database/database");

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users";
    sql.query(config, query, (err, results) => {
      if (err) {
        console.log("Error retrieving users: ", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE id = ${id}`;
    sql.query(config, query, (err, results) => {
      if (err) {
        console.log("Error retrieving user: ", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.create = (user) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users (users_name, phone, address) VALUES ('${user.users_name}', '${user.phone}', '${user.address}')`;
    sql.query(config, query, (err, results) => {
      if (err) {
        console.log("Error creating user: ", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.update = (id, user) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE users SET users_name = '${user.users_name}', phone = '${user.phone}', address = '${user.address}' WHERE id = ${id}`;
    sql.query(config, query, (err, results) => {
      if (err) {
        console.log("Error updating user: ", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM users WHERE id = ${id}`;
    sql.query(config, query, (err, results) => {
      if (err) {
        console.log("Error deleting user: ", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
