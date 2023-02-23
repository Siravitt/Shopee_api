const express = require("express");
const router = express.Router();

const shopAuthController = require("../../controllers/shop/shop-auth-controller");

router.post("/shop-register", shopAuthController.register);
router.post("/shop-login", shopAuthController.login);

module.exports = router;
