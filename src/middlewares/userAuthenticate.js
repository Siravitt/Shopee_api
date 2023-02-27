const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");
const { User, Shop } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("You are unauthorized", 401);
    }

    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ["password"],
      },
    });

    const shop = await Shop.findOne({
      where: { userId: payload.id },
    });

    if (!user) {
      createError("You are unauthorized", 401);
    }
    
    if (shop) {
      req.shop = shop;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
