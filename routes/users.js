import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getByIdUserController,
  updateUserController,
} from "../controllers/users.js";
import { authAdmin } from "../middlewares/authenticateAdmin.js";
import { validatorAddUser } from "../validation/validator.js";
import { handleValidation } from "../middlewares/handleValidationError.js";

const user = express.Router();

user.get("/users", authAdmin, getAllUserController);
user.get("/users/:id", authAdmin, getByIdUserController);
user.post(
  "/users-create",
  authAdmin,
  validatorAddUser(),
  handleValidation,
  createUserController
);
user.put("/users-update/:id", authAdmin, updateUserController);
user.delete("/users-delete/:id", authAdmin, deleteUserController);

export default user;
