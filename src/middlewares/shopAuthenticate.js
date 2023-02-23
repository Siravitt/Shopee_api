const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");
const { Shop } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("You are unauthorized", 401);
    }

    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const shop = await Shop.findOne({
      where: {
        id: payload.id,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!shop) {
      createError("You are unauthorized", 401);
    }

    req.shop = shop;
    next();
  } catch (err) {
    next(err);
  }
};
