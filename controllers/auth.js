const Admin = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secretKey = process.env.SECRET_KEY;

exports.auth = async (req, res) => {
  const { name, password } = req.body;

  try {
    const admin = await Admin.auth(name);
    if (!admin) {
      return res.status(401).json({ message: "Invalid your account!" });
    }
    const checkPass = bcrypt.compareSync(password, admin.password);
    if (!checkPass) {
      return res.status(401).json({ message: "Invalid your password!" });
    }
    return res.status(200).json({ message: "Login successful!", admin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred", error });
  }
};

exports.reg = async (req, res) => {
  const { name, password } = req.body;
  try {
    if (!name || !password) {
      return res.status(400).json({ message: "Invalid name or password?" });
    }
    const validateName = await Admin.validate(name);
    if (validateName) {
      return res.status(409).json({ message: "Invalid name!" });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const token = jwt.sign({ name: name, role: "admin" }, secretKey);
    await Admin.reg(name, hashPassword, token);
    return res.status(201).json({ message: "successful!" });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};
