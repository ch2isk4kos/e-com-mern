const express = require("express");
const router = express.Router();

// middleware imports
const { authenticateToken } = require("../middleware/auth.js");

// authentication controller imports
const { userCart, getUserCart, emptyUserCart } = require("../controllers/user");

router.post("/user/cart", authenticateToken, userCart);
router.get("/user/cart", authenticateToken, getUserCart);
router.delete("/user/cart", authenticateToken, emptyUserCart);

// router.get("/user", (req, res) => {
//   res.json({
//     data: "User",
//   });
// });

module.exports = router;
