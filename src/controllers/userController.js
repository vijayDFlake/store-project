const User = require("../models/user");
const bcrypt = require("bcrypt");
const roles = require("../roles/roles.json");

exports.addUser = async (req, res, next) => {
  try {
    console.log(req);
    if (!req.user || !req.user.role_id || req.user.role_id !== roles.Admin) {
      return res.status(403).json({ message: "Access denied." });
    }

    const { name, role_id, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      role_id,
      email,
      password: hashedPassword,
    });

    res.json({ message: "User added successfully", user_id: newUser.user_id });
  } catch (error) {
    next(error);
  }
};

exports.viewAllUser = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const updatedData = req.body;
    const user = await User.findByPk(user_id);
    // console.log("user=", user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (updatedData.password) {
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);
      updatedData.password = hashedPassword;
    }
    const updatedUser = await user.update(updatedData);
    res.json({ message: "User updated successfully", user_id });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(user_id);
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete user from the database
    await user.destroy();

    res.json({ message: "User deleted successfully", user_id });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(user_id);
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};
