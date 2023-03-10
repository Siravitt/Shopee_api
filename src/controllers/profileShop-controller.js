const { Shop } = require("../models");
const fs = require("fs")
const {
  validateEditShopProfile,
} = require("../validators/profileShop-validate");
const cloudinary = require("../utils/cloudinary");

exports.editShopProfile = async (req, res, next) => {
  try {
    const profilePublicId = req.shop.profileImage
      ? cloudinary.getPublicId(req.shop.profileImage)
      : null;

    const value = validateEditShopProfile(req.body);

    if (req.file?.path) {
      value.profileImage = await cloudinary.upload(
        req.file.path,
        profilePublicId
      );
    }

    await Shop.update(value, {
      where: {
        id: req.shop.id,
      },
    });

    res.status(200).json({ message: "Update success" });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
