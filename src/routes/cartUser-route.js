const express = require("express");
const router = express.Router();

const userCartController = require("../controllers/cartUser-controller");

router.get("/get-cart", userCartController.getCart);
router.post("/add-cart", userCartController.addToCart);
router.delete(
  "/delete-id-product/:productId",
  userCartController.deleteCartByProductId
);
router.patch("/update-cart", userCartController.updateCart)
router.delete("/delete-all-cart", userCartController.deleteAllCart);

module.exports = router;
