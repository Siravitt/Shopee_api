const express = require("express");
const router = express.Router();

const authUserControllers = require("../controllers/authUser-controller");

router.post("/register", authUserControllers.register);
router.post("/login", authUserControllers.login);

module.exports = router;
