const { Product } = require("../models");

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({ limit: 50 });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};
