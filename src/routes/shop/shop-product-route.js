const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/upload");

const shopProductController = require("../../controllers/shop/shop-product-controller");

router.get("/get-product", shopProductController.getAllProduct);
router.get("/:productId", shopProductController.getProductById);
router.post(
  "/create-product",
  upload.array("productImage"),
  shopProductController.createProduct
);
router.patch(
  "/edit-product/:productId",
  upload.array("productImage"),
  shopProductController.editProduct
);

module.exports = router;
