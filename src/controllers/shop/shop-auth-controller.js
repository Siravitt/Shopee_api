const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {
  validateRegister,
  validateLogin,
} = require("../../validators/shop-auth-validate");
const { Op } = require("sequelize");
const { Shop } = require("../../models");
const createError = require("../../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const shop = await Shop.findOne({
      where: {
        [Op.or]: [
          {
            email: value.email,
          },
          {
            phone: value.phone,
          },
        ],
      },
    });

    if (shop) {
      createError("Email or mobile phone is already in use", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);

    await Shop.create(value);

    res.status(200).json({ message: "Register success. Please go to login" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const shop = await Shop.findOne({
      where: {
        email: value.email,
      },
    });

    if (!shop) {
      createError("Invalid email or password", 400);
    }

    const accessToken = jwt.sign(
      {
        id: shop.id,
        shopName: shop.shopName,
        email: shop.email,
        phone: shop.phone,
        profileImage: shop.profileImage,
        createdAt: shop.createdAt,
        updatedAt: shop.updatedAt,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
