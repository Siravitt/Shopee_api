const jwt = require("jsonwebtoken");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authUser-validate");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const value = validateRegister(req.body);

    const user = await User.findOne({
      where: { email: value.email, phone: value.phone },
    });

    if (user) {
      createError("Email or phone number is already in use", 400);
    }

    await User.create(value);

    res.status(200).json({ message: "Register success" });
  } catch (err) {
    next(err);
  }
};

exports.getme = async (req, res, next) => {
  // console.log("------>", JSON.stringify(req.user));
  res.status(200).json(req.user);
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const user = await User.findOne({
      where: { email: value.email },
    });

    if (!user) {
      createError("Invalid email or password", 400);
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        is_shop: user.is_shop,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
