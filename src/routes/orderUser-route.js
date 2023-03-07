const express = require("express");
const router = express.Router();

const userOrderController = require("../controllers/orderUser-controller");

router.get("/all-order", userOrderController.getOrder);
router.post("/create-order", userOrderController.createOrder);
router.patch("/update-order/:orderShopId", userOrderController.updateOrder);

router.get("/all-orderShopForuser", userOrderController.getOrderShopForuser); //add

// router.get("/all-orderForuser", userOrderController.getOrderShopForuser); //add

module.exports = router;
