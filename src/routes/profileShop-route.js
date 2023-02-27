const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const shopProfileController = require("../controllers/profileShop-controller");

router.patch(
  "/edit-profile",
  upload.single("profileImage"),
  shopProfileController.editShopProfile
);

module.exports = router;
