const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-user-validate");
const createError = require("../utils/create-error");
const { Op } = require("sequelize");
const { User } = require("../models");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const user = await User.findOne({
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

    console.log(user);

    if (user) {
      createError("Email or mobile phone is already in use", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);

    await User.create(value);

    res.status(201).json({ message: "Register success. Please go to login" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const user = await User.findOne({
      where: {
        email: value.email,
      },
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
