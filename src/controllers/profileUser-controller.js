const { User } = require("../models");
const fs = require("fs")
const { validateUserEditProfile } = require("../validators/profileUser-validate");
const cloudinary = require("../utils/cloudinary");

exports.editUserProfile = async (req, res, next) => {
  try {
    const profilePublicId = req.user.profileImage
      ? cloudinary.getPublicId(req.user.profileImage)
      : null;

    const value = validateUserEditProfile(req.body);

    if (req.file?.path) {
      value.profileImage = await cloudinary.upload(
        req.file.path,
        profilePublicId
      );
    }

    await User.update(value, {
      where: { id: req.user.id },
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
