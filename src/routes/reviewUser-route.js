const express = require("express");
const router = express.Router();

const userReviewController = require("../controllers/reviewUser-controller");

router.get("/get-review/:productId", userReviewController.getAllReview);
router.post("/create-review/:productId", userReviewController.createReview);

module.exports = router;
