const express = require("express");
const users = require("../controllers/users");
const { authAdmin } = require("../middlewares/authenticateAdmin");

const router = express.Router();

router.get("/users", authAdmin, users.getAll);
router.get("/users/:id", authAdmin, users.getById);
router.post("/users-create", authAdmin, users.create);
router.put("/users-update/:id", authAdmin, users.update);
router.delete("/users-delete/:id", authAdmin, users.delete);

module.exports = router;
