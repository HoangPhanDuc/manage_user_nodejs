const Users = require("../models/users");

exports.getAll = async (req, res) => {
  try {
    const users = await Users.getAll();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ mess: error });
    console.log(error);
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await Users.getById(id);
    if (!users) {
      return res.status(404);
    } else res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ mess: error });
    console.log(error);
  }
};

exports.create = async (req, res) => {
  const user = req.body;
  try {
    const users = await Users.create(user);
    res.status(201).json({ mess: "created success!", user: users });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  console.log(user);
  try {
    const users = await Users.update(id, user);
    if (users) {
      res.status(200).json({ mess: "updated success!", user: users });
    } else {
      res.status(404).json({ mess: "error updating" });
    }
  } catch (error) {
    res.status(500).json({ mess: error });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Users.delete(id);
    res.status(200).json({ mess: "success" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
};
