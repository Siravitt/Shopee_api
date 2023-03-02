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

//=========================add shop =======================
exports.getAllProductByShopId = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const productShopId = await Product.findAll({
      include: { model: ProductImage },
      where: {
        shopId: shopId,
      },
      order: Sequelize.literal("rand()"),
      limit: 10,
    });

    res.status(200).json({ productShopId });
  } catch (err) {
    next(err);
  }
};
//=========================end add shop =======================

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
