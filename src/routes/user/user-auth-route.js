const express = require("express");
const router = express.Router();

const userAuthController = require("../../controllers/user/user-auth-controller");
const userAuthenticate = require("../../middlewares/userAuthenticate");

router.post("/user-register", userAuthController.register);
router.post("/user-login", userAuthController.login);
router.get("/getMe", userAuthenticate, userAuthController.getme);

module.exports = router;
