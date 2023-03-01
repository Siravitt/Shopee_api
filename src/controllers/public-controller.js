const { Product, Sequelize, ProductImage } = require("../models");

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: { model: ProductImage },
      order: Sequelize.literal("rand()"),
      limit: 10,
    });

    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getAllProductByCatId = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.findAll({
      include: { model: ProductImage },
      where: {
        categoryId: categoryId,
      },
      order: Sequelize.literal("rand()"),
      limit: 10,
    });

    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};
