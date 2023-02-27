const express = require("express");
const router = express.Router();

const publicController = require("../controllers/public-controller")

router.get("/product", publicController.getAllProduct);
router.get("/product/:productId", publicController.getProductById)

module.exports = router;
