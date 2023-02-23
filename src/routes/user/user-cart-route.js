const express = require("express");
const router = express.Router();

const cartController = require("../../controllers/user/user-cart-controller");

router.get("/get-cart", cartController.getCart);
router.post("/add-cart", cartController.addToCart);

module.exports = router;
