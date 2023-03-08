const { Address } = require("../models");
const createError = require("../utils/create-error");
const {
  validateCreateAddress,
  validateEditAddress,
} = require("../validators/addressUser-validate");

exports.getAllAddress = async (req, res, next) => {
  try {
    const addresses = await Address.findAll({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).json({ addresses });
  } catch (err) {
    next(err);
  }
};

exports.getAddressById = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findOne({
      where: {
        id: addressId,
        userId: req.user.id,
      },
    });

    if (!address) {
      createError("Address not found", 400);
    }

    res.status(200).json({ address });
  } catch (err) {
    next(err);
  }
};

exports.createAddress = async (req, res, next) => {
  try {
    const value = validateCreateAddress(req.body);
    value.userId = req.user.id;

    await Address.create(value);

    res.status(200).json({ message: "Create address success" });
  } catch (err) {
    next(err);
  }
};

exports.editAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const value = validateEditAddress(req.body);

    await Address.update(value, {
      where: { id: addressId },
    });

    res.status(200).json({ message: "Update success" });
  } catch (err) {
    next(err);
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const value = validateEditAddress(req.body);

    await Address.update(
      {
        // user_id: req.user.user_id,
        userId: 0,
      },
      {
        where: { id: addressId },
      },
    );

    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    next(err);
  }
};
