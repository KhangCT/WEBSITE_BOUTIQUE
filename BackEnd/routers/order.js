const express = require("express");

const router = express.Router();
const { body } = require("express-validator");
const orderController = require("../controllers/order");

// router.get("/", orderController);
router.put(
  "/",
  [
    body("fullName").trim().not().isEmpty().withMessage("Invalid fullname"),
    body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    body("phone")
      .not()
      .isEmpty()
      .isLength({ min: 9, max: 11 })
      .withMessage("Invalid phone"),
    body("address").trim().not().isEmpty().withMessage("Invalid address"),
  ],
  orderController.putOrder
);

router.post("/", orderController.postGetOrders);
router.get("/", orderController.getOrders);
router.get("/:orderId", orderController.getOrder);

module.exports = router;
