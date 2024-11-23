import mysql from "mysql2";

const connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .promise();

connection.connect((err) => {
  if (err) {
    console.error("Error connect to MySQL: ", err);
  } else {
    console.log("Connect successful!");
  }
});

export default connection;
