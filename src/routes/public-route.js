const express = require("express");
const router = express.Router();

const publicController = require("../controllers/public-controller");

router.get("/product", publicController.getAllProduct);
router.get(
  "/product/category/:categoryId",
  publicController.getAllProductByCatId,
);
router.get("/product/:productId", publicController.getProductById);
router.get("/image/:productId", publicController.getProductImage);
//---------------------router shop-----------------------
router.get("/Shopproduct/:shopId", publicController.getAllProductByShopId);
//---------------------end router shop-----------------------

module.exports = router;
