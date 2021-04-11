const express = require("express");
const router = express.Router();

//middleware imports
const { authenticateToken } = require("../middleware/auth.js");

//authentication controller imports
const {
  userCart,
  getUserCart,
  emptyUserCart,
  userAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
} = require("../controllers/user");

router.post("/user/cart", authenticateToken, userCart);
router.get("/user/cart", authenticateToken, getUserCart);
router.delete("/user/cart", authenticateToken, emptyUserCart);
router.post("/user/address", authenticateToken, userAddress);

//user coupons
router.post("/user/cart/coupon", authenticateToken, applyCouponToUserCart);

//user orders
router.post("/user/order", authenticateToken, createOrder);
router.get("/user/orders", authenticateToken, orders);

// router.get("/user", (req, res) => {
//   res.json({
//     data: "User",
//   });
// });

module.exports = router;
