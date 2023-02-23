const express = require("express");
const router = express.Router();

const userAuthController = require("../../controllers/user/user-auth-controller");

router.post("/user-register", userAuthController.register);
router.post("/user-login", userAuthController.login);

module.exports = router;
