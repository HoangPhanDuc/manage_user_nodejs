import express from "express";
import { authController, regController } from "../controllers/auth.js";
import { validatorLogin, validatorRegister } from "../validation/validator.js";
import { handleValidation } from "../middlewares/handleValidationError.js";

const admin = express.Router();

admin.post("/login", validatorLogin(), handleValidation, authController);
admin.post("/register", validatorRegister(), handleValidation, regController);

export default admin;
