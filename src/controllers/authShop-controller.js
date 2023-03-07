const { Shop, User, Address } = require("../models");
const createError = require("../utils/create-error");
const { validateCreateShop } = require("../validators/authShop-validate");

exports.registerShop = async (req, res, next) => {
  // console.log(JSON.stringify(req.shop, null, 2));
  console.log(req.shop, "555555");
  try {
    const value = validateCreateShop(req.body);

    if (req.user.is_shop) {
      createError("You are already be seller", 400);
    }

    const address = await Address.findOne({
      where: {
        userId: req.user.id,
      },
    });
    value.userId = req.user.id;
    if (address) {
      value.address = address.address;
      value.district = address.district;
      value.subDistrict = address.subDistrict;
      (value.province = address.province),
        (value.postalCode = address.postalCode);
    } else {
      await Shop.create(value);
      await User.update(
        { is_shop: true },
        {
          where: {
            id: req.user.id,
          },
        }
      );
    }

    res.status(200).json({ message: "You can start selling" });
  } catch (err) {
    next(err);
  }
};

exports.getShop = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({ shop });
  } catch (err) {
    next(err);
  }
};
