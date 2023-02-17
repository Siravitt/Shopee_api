const express = require("express");
const router = express.Router();

const authUserController = require("../controllers/auth-user-controller");

router.post("/user-register", authUserController.register);
router.post("/user-login", authUserController.login);

module.exports = router;
