const User = require("../model/User");
const logger = require("../config/logger");
const inputValidator = require("../services/inputValidator");

//get all users
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    logger.userLogger.log("error", "Error getting the list of users");
    return next(err);
  }
  logger.userLogger.log("error", "Error getting the list of users");

  if (!users) {
    logger.userLogger.log("error", "Error getting the list of users");

    res.status(500).json({ message: "Internal Server error" });
    logger.userLogger.log("error", "Error getting the list of users");
  } else {
    logger.userLogger.log("info", "Successfully got the list of users");
    return res.status(200).json({ users });
  }
};

//post user

const addUser = async (req, res, next) => {
  //these are the thing we send to req.body from postman
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() == "" &&
    !email.trim() === "" &&
    !password &&
    password.length > 6
  ) {
    // logger.userLogger.log("error", "Invalid1 data");
    return res.status(422).json({ message: "Invalid Data" });
  }

  let user;
  try {
    const userName = req.body.name;
    const checking = inputValidator(userName);
    // let boolean = true;
    if (checking) {
      logger.userLogger.log("info", "Checking");
    }
    user = new User({
      name,
      email,
      password,
    });
    user = await user.save();
  } catch (err) {
    return next(err);
  }
  logger.userLogger.log("error", "Error adding user");

  if (!user) {
    res.status(500).json({ message: "Unable to save user" });
    logger.userLogger.log("error", "Error adding user");
  } else {
    logger.userLogger.log("info", "Successfully added the user");

    return res.status(201).json({ user });
  }
};

//update user

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() == "" &&
    !email.trim() === "" &&
    !password &&
    password.length > 6
  ) {
    logger.userLogger.log("error", "Invalid data");

    return res.status(422).json({ message: "Invalid Data" });
  }

  let user;
  try {
    user = await User.findByIdAndUpdate(id, { name, email, password });
  } catch (err) {
    logger.userLogger.log("error", "Error updating the user");

    return next(err);
  }
  if (!user) {
    logger.userLogger.log("error", "Error updating the user");

    return res.status(500).json({ message: "Unable to update user" });
  } else {
    logger.userLogger.log("info", "Successfully the updated of user");
    return res.status(200).json({ message: "updated successfully" });
  }
};

//delete user
const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    logger.userLogger.log("error", "Error deleting the users");
    return next(err);
  }
  if (!user) {
    logger.userLogger.log("error", "Error2 deleting the users");

    return res.status(500).json({ message: "Unable to delete user" });
  } else {
    logger.userLogger.log("info", "Successfully deleted the user");

    return res.status(200).json({ message: "deleted successfully" });
  }
};

//get user by id

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    // logger.userLogger.log("error", "Error getting thr user by id");
    return next(err);
  }
  if (!user) {
    // logger.userLogger.log("error", "Error getting thr user by id");
    return res.status(404).json({ message: "Unable to find user" });
  } else {
    logger.userLogger.log("info", "Successfully got the user");

    return res.status(200).json({ user });
  }
};

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
