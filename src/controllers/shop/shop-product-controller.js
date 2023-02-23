const fs = require("fs");

const { Product, ProductPicture } = require("../../models");
const cloudinary = require("../../utils/cloudinary");
const createError = require("../../utils/create-error");
const {
  validateCreateProduct,
  validateEditProduct,
} = require("../../validators/shop-product-validate");

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        shopId: req.shop.id,
      },
    });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findAll({
      where: {
        shopId: req.shop.id,
        id: productId,
      },
    });

    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const value = validateCreateProduct({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      weight: req.body.weight,
      categoryId: req.body.categoryId,
    });

    value.shopId = req.shop.id;

    const result = await Product.create(value);

    //! Image upload
    
    if (req.files) {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await cloudinary.upload(path);
        urls.push({ isMain: false, image: newPath, productId: result.id });
        fs.unlinkSync(path);
      }
      urls[0].isMain = true;

      urls.map(async (el) => await ProductPicture.create(el));
    }

    res.status(200).json({ message: "Create product success" });
  } catch (err) {
    next(err);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    req.body.array = JSON.parse(req.body.array);
    // console.log(JSON.parse(req.body.array));

    const value = validateEditProduct(req.body);

    // console.log(value);

    // const product = await Product.findOne({
    //   where: {
    //     id: productId,
    //     shopId: req.shop.id,
    //   },
    // });

    // if (!product) {
    //   createError("Not found");
    // }
    // console.log(productPicture);

    //! Image change
    
    if (req.files) {
      const urls = [];
      const files = req.files;
      const images = await ProductPicture.findAll({
        where: {
          productId: productId,
        },
      });

      for (let i = 0; i < value.array.length; i++) {
        console.log(value.array[i]);
      }

      for (const image of images) {
        const publicId = [];
        const oldPublicId = cloudinary.getPublicId(image.dataValues.image);
        publicId.push(oldPublicId);
      }
      for (const file of files) {
        const { path } = file;
        const newPath = cloudinary.upload(path, publicId);
      }
    }

    // if (value) {
    //   await Product.update(value);
    // }

    res.status(200).json({ message: "Update success" });
  } catch (err) {
    next(err);
  }
};
