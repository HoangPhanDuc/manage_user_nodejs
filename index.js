import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

import admin from "./routes/auth.js";
import user from "./routes/users.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/", user);
app.use("/api/v1/", admin);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
