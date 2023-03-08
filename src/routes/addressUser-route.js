const express = require("express");
const router = express.Router();

const userAddressController = require("../controllers/addressUser-controller");

router.get("/all-address", userAddressController.getAllAddress);
router.get("/id-address/:addressId", userAddressController.getAddressById);
router.post("/create-address", userAddressController.createAddress);
router.patch("/edit-address/:ç", userAddressController.editAddress);
router.patch("/delete/:addressId", userAddressController.deleteAddress);

module.exports = router;
