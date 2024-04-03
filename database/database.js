const config = `Server=${process.env.DB_SERVER};
Database=${process.env.DB_NAME};
Uid=${process.env.DB_USER};
Pwd=${process.env.DB_PASSWORD};
Driver={ODBC Driver 17 for SQL Server}`;

module.exports = config;
