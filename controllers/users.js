import { handleValidation } from "../middlewares/handleValidationError.js";
import {
  create,
  deleteUser,
  getAll,
  getById,
  update,
} from "../service/users.js";
import { param } from "express-validator";

export const getAllUserController = async (req, res) => {
  try {
    const users = await getAll();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ mess: error });
    console.log(error);
  }
};

export const getByIdUserController = [
  param("id").isInt().withMessage("ID must be an integer"),
  handleValidation,
  async (req, res) => {
    const id = req.params.id;
    try {
      const users = await getById(id);
      if (!users) {
        return res.status(404);
      } else res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ mess: error });
      console.log(error);
    }
  },
];

export const createUserController = async (req, res) => {
  const user = req.body;
  try {
    const users = await create(user);
    res.status(201).json({ mess: "created success!", user: users });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
};

export const updateUserController = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  try {
    const users = await update(id, user);
    if (users) {
      res.status(200).json({ mess: "updated success!", user: users });
    } else {
      res.status(404).json({ mess: "error updating" });
    }
  } catch (error) {
    res.status(500).json({ mess: error });
  }
};

export const deleteUserController = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteUser(id);
    res.status(200).json({ mess: "success" });
  } catch (error) {
    res.status(500).json({ mess: error });
  }
};
