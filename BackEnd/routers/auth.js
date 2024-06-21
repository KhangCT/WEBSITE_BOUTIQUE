const express = require("express");

const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/auth");
const User = require("../models/user");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be more than 5 characters"),
    body("fullName").trim().not().isEmpty(),
    body("phone").not().isEmpty().isLength({ min: 9, max: 11 }),
  ],
  authController.putSignup
);

router.post("/signin", authController.postSignIn);
router.post("/admin/signin", authController.postAdminSignIn);

module.exports = router;
