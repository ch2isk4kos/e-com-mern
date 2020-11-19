const express = require("express");
const router = express.Router();

// middleware
const { authenticateToken, authenticateAdmin } = require("../middleware/auth");

// controller
const {
  index,
  create,
  read,
  update,
  remove,
} = require("../controllers/subCategory");

// routes
router.get("/subs", index);
router.post("/sub", authenticateToken, authenticateAdmin, create);
router.get("/sub/:slug", read);
router.put("/sub/:slug", authenticateToken, authenticateAdmin, update);
router.delete("/sub/:slug", authenticateToken, authenticateAdmin, remove);

module.exports = router;
