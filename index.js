const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const auth = require("./routers/auth");
const users = require("./routers/users");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", users);
app.use("/", auth);

const port = process.env.PORT;

app.listen(port, () => {git remote add origin https://github.com/HoangPhanDuc/manager_user_reactjs.git
  console.log(`serrver is running on port ${port}!`);
});
