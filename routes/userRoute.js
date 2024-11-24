const express = require("express");
const { body } = require("express-validator"); // Pour les validations, si nécessaire
const { register, login, logout } = require("../controllers/userController");

const router = express.Router();

router.post(
  "/register",
  [
    body("username").isString().notEmpty().withMessage("Username is required."),
    body("password").isString().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
  ],
  register
);

router.post(
  "/login",
  [
    body("username").isString().notEmpty().withMessage("Username is required."),
    body("password").isString().notEmpty().withMessage("Password is required."),
  ],
  login
);

router.get("/logout", logout);

module.exports = router;
