const { Op } = require("sequelize");
const { Product, Sequelize, ProductImage, Shop, OrderItem, sequelize } = require("../models");

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: {
        model: ProductImage,
        where: {
          isMain: {
            [Op.ne]: false,
          },
        },
      },
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
      include: {
        model: ProductImage,
        where: {
          isMain: {
            [Op.ne]: false,
          },
        },
      },
      where: {
        categoryId: categoryId,
      },
      order: Sequelize.literal("rand()"),
      limit: 10,
      include: [
        {
          model: OrderItem,
          attributes: [],
        },
      ],
      attributes: [
        [
          sequelize.fn("sum", sequelize.col("OrderItems.quantity")),
          "totalSale",
        ],
        "id",
        "name",
        "price",
        "description",
        "weight",
        "quantityAvailable",
        "categoryId",
        "shopId",
      ],
      group: ["Product.id"],
      subQuery: false,
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
      include: [
        {
          model: Shop,
        },
        {
          model: OrderItem,
          attributes: [],
        },
      ],
      attributes: [
        [
          sequelize.fn("sum", sequelize.col("OrderItems.quantity")),
          "totalSale",
        ],
        "id",
        "name",
        "price",
        "description",
        "weight",
        "quantityAvailable",
        "categoryId",
        "shopId",
      ],
      group: ["Product.id"],
      subQuery: false,
    });
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.getProductImage = async (req, res, next) => {
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
