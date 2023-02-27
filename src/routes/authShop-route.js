const express = require("express");
const router = express.Router();

const authShopController = require('../controllers/authShop-controller')

router.get("/get-shop", authShopController.getShop)
router.post("/register", authShopController.registerShop);

module.exports = router;
