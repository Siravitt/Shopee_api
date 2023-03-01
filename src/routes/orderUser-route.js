const express = require("express");
const router = express.Router();

const userOrderController = require("../controllers/orderUser-controller");

router.post("/create-order", userOrderController.createOrder);

module.exports = router;
