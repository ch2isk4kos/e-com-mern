const express = require("express");
const router = express.Router();

//middleware imports
const {
  authenticateToken,
  authenticateAdmin,
} = require("../middleware/auth.js");

//authentication controller imports
const { orders, orderStatus } = require("../controllers/admin.js");

router.get("/admin/orders", authenticateToken, orders);
router.put("/admin/status", authenticateToken, orderStatus);

module.exports = router;
