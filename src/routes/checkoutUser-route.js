const express = require("express");
const router = express.Router();

const userCheckoutController = require("../controllers/checkoutUser-controller")

router.post("/create-charge", userCheckoutController.createCharge)

module.exports = router;