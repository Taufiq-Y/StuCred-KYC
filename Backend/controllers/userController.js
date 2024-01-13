const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, firstname, lastname } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRE}`,
    });

    return res.status(200).json({
      statusCode: 200,
      userInfo: user,
      access_token: token,
    });
  } catch (error) {
    console.error("Login failed", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserBy = async (req, res) => {
  try {
    const { page = 1, search = "" } = req.query;

    const pageSize = 5;

    const skip = (page - 1) * pageSize;

    const query = search ? { email: { $regex: new RegExp(search, "i") } } : {};

    const users = await User.find(query).skip(skip).limit(pageSize);

    console.log("users::: ", users);

    return res.status(200).json({
      statusCode: 200,
      users,
    });
  } catch (error) {
    console.error("Error fetching users", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
