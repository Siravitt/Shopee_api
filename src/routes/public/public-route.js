const express = require("express");
const router = express.Router();

const productController = require("../../controllers/product-controller");

router.get("/all-product", productController.getAllProduct);

module.exports = router;
