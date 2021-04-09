const express = require("express");
const router = express.Router();

// middleware imports
const { authenticateToken } = require("../middleware/auth.js");

// authentication controller imports
const {
  userCart,
  getUserCart,
  emptyUserCart,
  userAddress,
  applyCouponToUserCart,
} = require("../controllers/user");

router.post("/user/cart", authenticateToken, userCart);
router.get("/user/cart", authenticateToken, getUserCart);
router.delete("/user/cart", authenticateToken, emptyUserCart);
router.post("/user/address", authenticateToken, userAddress);

// user coupons
router.post("/user/cart/coupon", authenticateToken, applyCouponToUserCart);

// router.get("/user", (req, res) => {
//   res.json({
//     data: "User",
//   });
// });

module.exports = router;
