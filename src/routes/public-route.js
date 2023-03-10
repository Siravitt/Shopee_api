const express = require("express");
const router = express.Router();

const publicController = require("../controllers/public-controller");

const searchProductController = require("../controllers/searchProduct-controller");

router.get("/product", publicController.getAllProduct);
router.get(
  "/product/category/:categoryId",
  publicController.getAllProductByCatId,
);
router.get("/product/:productId", publicController.getProductById);
router.get("/image/:productId", publicController.getProductImage);
//---------------------router shop-----------------------
router.get("/Shopproduct/:shopId", publicController.getAllProductByShopId);
router.get("/shop/:shopId", publicController.getShopInfoPublic);
//---------------------end router shop-----------------------

router.get("/item", searchProductController.searchProduct);

module.exports = router;
