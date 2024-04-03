const express = require("express");
const Auth = require("../controllers/auth");

const auth = express.Router();

auth.post("/login", Auth.auth);
auth.post("/register", Auth.reg);

module.exports = auth;