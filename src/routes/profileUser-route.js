const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload")

const userProfileController = require("../controllers/profileUser-controller")

router.patch("/edit-profile",upload.single("profileImage"), userProfileController.editUserProfile)

module.exports = router;