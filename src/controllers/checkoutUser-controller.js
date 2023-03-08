const omise = require("../config/omise");
const { Transaction } = require("../models");

exports.createCharge = async (req, res, next) => {
  try {
    const { email, name, amount, token } = req.body;
    const customer = await omise.customers.create({
      email: email,
      description: name,
      card: token,
    });
    const charge = await omise.charges.create({
      amount: amount,
      currency: "thb",
      customer: customer.id,
    });
    if (charge.status === "successful") {
      await Transaction.create({
        transactionId: charge.id,
        userId: req.user.id,
      });
    }
    res.status(200).json({
      amount: charge.amount,
      status: charge.status,
    });
  } catch (err) {
    next(err);
  }
};
