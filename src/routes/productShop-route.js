const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const shopProductController = require("../controllers/productShop-controller");

router.get("/all-product", shopProductController.getAllProduct);
router.post(
  "/create-product",
  upload.array("image"),
  shopProductController.createProduct,
);
router.delete("/delete/:productId", shopProductController.deleteProduct);

module.exports = router;
