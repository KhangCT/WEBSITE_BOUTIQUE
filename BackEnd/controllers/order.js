const { validationResult } = require("express-validator");
const Order = require("../models/order");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "khangcaobmt123@gmail.com",
    pass: "apby padh iima nfrj",
  },
});

exports.getOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  console.log(orderId);
  Order.findOne({ _id: orderId })
    .populate("cart.items.productId")
    .then((order) => {
      res.status(201).json(order);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postGetOrders = async (req, res, next) => {
  const userId = req.body.userId;
  Order.find({ userId: userId })
    .populate("cart.items.productId")
    .then((order) => {
      res.status(201).json(order);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getOrders = async (req, res, next) => {
  function getUnique(arr, comp) {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  }
  Order.find()
    .populate("cart.items.productId")
    .then((order) => {
      const user = getUnique(order, "userId");
      let Earning = 0;
      order.map((value) => (Earning += value.totalPrice));
      res.status(201).json({
        order: order,
        Earning: Earning,
        newOrder: order.length,
        user: user.length,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.putOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation failed.");
    console.log(errors.array()[0]);
    return res.json({
      validationErrors: errors.array()[0].path,
      message: errors.array()[0].msg,
    });
  }
  const cartInput = req.body.cart;
  const cart = cartInput.items.map((item) => {
    return { productId: item.id, quantity: item.quantity };
  });
  try {
    const order = new Order({
      email: req.body.email,
      address: req.body.address,
      fullName: req.body.fullName,
      phone: req.body.phone,
      userId: req.body.userId,
      totalPrice: req.body.cart.totalPrice,
      "cart.items": cart,
      status: "Waiting for pay",
      delivery: "Waiting for progressing",
    });
    // order.save();
    transporter.sendMail({
      to: req.body.email,
      form: "BOTIQUE@gmail.com",
      subject: "BOTIQUE - Xác nhận đơn hàng",
      html: `<h2> Xin chào ${req.body.fullName}<h2/>
      <h4>Phone: ${req.body.phone}<h4/>
      <h4>Address: ${req.body.address}<h4/>
      <table style="
        border: 1px solid black;
        width: 700px;
      ">
  <tr style="
  border: 1px solid black;
">
    <th style="
    border: 1px solid black;
  ">Tên Sản Phẩm</th>
    <th style="
    border: 1px solid black;
  ">Hình Ảnh</th>
    <th style="
    border: 1px solid black;
  ">Giá</th>
    <th style="
    border: 1px solid black;
  ">Số Lượng</th>
    <th style="
    border: 1px solid black;
  ">Thành Tiền</th>
  </tr>
  ${cartInput.items
    .map(
      (item) => `
    <tr style="
    border: 1px solid black;
  ">
      <th style="
      border: 1px solid black;
    ">${item.name}</th>
      <th style="
      border: 1px solid black;
    ">
        <img width="60" height="60" src='${item.img}' />
      </th>
      <th style="
      border: 1px solid black;
    ">${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</th>
      <th style="
      border: 1px solid black;
    ">${item.quantity}</th>
      <th style="
      border: 1px solid black;
    ">${(item.price * item.quantity)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</th>
    </tr>`
    )
    .join("")}
  
  
</table>
<h2>Tổng Thanh Toán: ${cartInput.totalPrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND<h2/>
<h2>BOTIQUE Xin cảm ơn !<h2/>
`,
    });
    res.status(201).json({ message: "Order created! " });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
