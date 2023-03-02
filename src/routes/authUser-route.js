const express = require("express");
const router = express.Router();

const authUserControllers = require("../controllers/authUser-controller");
const userAuthenticate = require("../middlewares/userAuthenticate");

router.post("/register", authUserControllers.register);
router.post("/login", authUserControllers.login);
router.get("/getMe", userAuthenticate, authUserControllers.getMe);
router.post("/google-login", authUserControllers.googleLogin);

module.exports = router;
