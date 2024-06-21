const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findOne({ _id: prodId })
    .then((product) => {
      Product.find({ category: product.category }).then((productCategory) => {
        const productCategoryFilter = productCategory.filter(
          (product) => product._id.toString() != prodId
        );
        res
          .status(200)
          .json({ product: product, productCategory: productCategoryFilter });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
