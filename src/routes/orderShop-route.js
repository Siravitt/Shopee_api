const express = require("express");
const router = express.Router();

const shopOrderController = require("../controllers/orderShop-controller");

router.get("/all-order", shopOrderController.getOrder);
router.patch("/update-order", shopOrderController.updateOrder);

router.get("/all-orderShop", shopOrderController.getOrderForshop);

module.exports = router;
