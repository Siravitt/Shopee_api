const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authUser-validate");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const user = await User.findOne({
      where: { email: value.email, phone: value.phone },
    });

    value.password = await bcrypt.hash(value.password, 12);
    if (user) {
      createError("Email or phone number is already in use", 400);
    }

    await User.create(value);

    res.status(200).json({ message: "Register success" });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
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

    console.log(user.password, value.password);

    const isCorrect = await bcrypt.compare(value.password, user.password);
    if (!isCorrect) {
      createError("Invalid email or mobile or password", 400);
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
        isShop: user.is_shop,
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

exports.googleLogin = async (req, res, next) => {
  try {
    // # verify with google
    // const response = await client.verifyIdToken({
    //   idToken: req.body.token,
    //   audience: process.env.GOOGLE_CLIENT_ID,
    //   // issuer: process.env.GOOGLE_CLIENT_ID,
    // });

    let google_user = jwtDecode(req.body.token);
    const { email, given_name, family_name } = google_user;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    let newUser;

    if (!user) {
      newUser = await User.create({
        email: email,
        firstName: given_name,
        lastName: family_name,
        userName: email,
      });
    }

    const accessToken = jwt.sign(
      {
        id: user ? user.id : newUser.id,
        name: user ? user.name : newUser.name,
        email: user ? user.email : newUser.email,
        profileImage: user ? user.profileImage : newUser.profileImage,
        createdAt: user ? user.createdAt : newUser.createdAt,
        updatedAt: user ? user.updatedAt : newUser.updatedAt,
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
