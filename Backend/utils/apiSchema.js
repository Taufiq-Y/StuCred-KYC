const { check, validationResult } = require('express-validator');

const validateRegister = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const validateLogin = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password").exists().withMessage("Password is required"),
];


module.exports = {validateRegister, validateLogin}