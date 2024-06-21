const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.putSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation failed.");
    console.log(errors.array()[0]);
    return res.json({
      validationErrors: errors.array()[0].path,
      message: errors.array()[0].msg,
    });
  }
  try {
    const hashedPw = await bcrypt.hash(req.body.password, 12);
    const user = new User({
      email: req.body.email,
      password: hashedPw,
      fullName: req.body.fullName,
      phone: req.body.phone,
      cart: { items: [] },
      role: "user",
    });
    console.log(user);
    user.save();
    res.status(201).json({ message: "User created! ", userId: user._id });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postSignIn = async (req, res, next) => {
  let loadedUser;
  const password = req.body.password;
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });

    if (user.length < 1) {
      return res.json({
        validationErrors: "email",
        message: "email or password wrong !",
      });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.json({
        validationErrors: "password",
        message: "email or password wrong !",
      });
    }

    loadedUser = user;

    const token = jwt.sign(
      { email: loadedUser.email, userId: loadedUser._id.toString() },
      "doanxem",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
      email: loadedUser.email,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postAdminSignIn = async (req, res, next) => {
  let loadedUser;
  const password = req.body.password;
  const email = req.body.email;
  try {
    const user = await User.findOne({
      email: email,
    });

    if (user == []) {
      return res.json({
        validationErrors: "email",
        message: "email or password wrong !",
      });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.json({
        validationErrors: "password",
        message: "email or password wrong !",
      });
    }

    loadedUser = user;

    const token = jwt.sign(
      { email: loadedUser.email, userId: loadedUser._id.toString() },
      "doanxem",
      { expiresIn: "1h" }
    );
    if (user.role == "admin") {
      return res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        email: loadedUser.email,
        isAdmin: user.role === "admin",
      });
    } else if (user.role == "tele") {
      return res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        email: loadedUser.email,
        isAdmin: user.role === "admin",
      });
    } else {
      return res.json({
        validationErrors: "role",
        message: "email or password wrong !",
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
