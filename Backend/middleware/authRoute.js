const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.authenticateToken = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ message: 'Pls Authorize With Token ' });
  } try {
    const decoded = await jwt.verify(token, process.env.jwt_Secret)
    const user = await User(decoded.id)
    console.log('user::: ', user);

    req.user = user

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error while authorizing token" })
  }
};

