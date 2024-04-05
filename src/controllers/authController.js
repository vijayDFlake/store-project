const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { v4: uuidv4 } = require("uuid");
const secretKey = uuidv4();
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ user_id: user.user_id, role_id: user.role_id }, 'f785be2c-ba03-411e-87c6-f2669d53393d');
    res.json({ token });
  } catch (error) {
    next(error);
  }
};


