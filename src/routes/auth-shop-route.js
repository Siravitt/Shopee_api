const express = require("express");
const router = express.Router();

const authShopController = require("../controllers/auth-shop-controller");

router.post("/shop-register", authShopController.register);
router.post("/shop-login", authShopController.login);

module.exports = router;
