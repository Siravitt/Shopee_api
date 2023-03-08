const fs = require("fs");
const { Product, ProductImage, sequelize, OrderItem } = require("../models");
const cloudinary = require("../utils/cloudinary");
const { validateCreateProduct } = require("../validators/product-validate");

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        shopId: req.shop.id,
      },
      include: [
        {
          model: ProductImage,
          where: {
            isMain: true,
          },
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
      group: ["Product.id", "ProductImages.id"],
      subQuery: false,
    });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const value = validateCreateProduct(req.body);

    value.shopId = req.shop.id;

    const product = await Product.create(value);

    if (req.files) {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await cloudinary.upload(path);
        urls.push({ isMain: false, image: newPath, productId: product.id });
        fs.unlinkSync(path);
      }
      await ProductImage.bulkCreate(urls);
    }
    res.status(200).json({ message: "Create product success" });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    await Product.destroy({
      where: {
        id: productId,
        shopId: req.shop.id,
      },
    });

    res.status(200).json({ message: "Delete complete" });
  } catch (err) {
    next(err);
  }
};
