// create router
const express = require("express");
const router = express.Router();

// middleware imports
const {
  authenticateToken,
  authenticateAdmin,
} = require("../middleware/auth.js");

// authentication controller imports
const {
  index,
  create,
  read,
  update,
  remove,
} = require("../controllers/category.js");

// Category Routes
router.get("/categories", index);
router.post("/category", authenticateToken, authenticateAdmin, create);
router.get("/category/:slug", read);
router.put("/category/:slug", authenticateToken, authenticateAdmin, update);
router.delete("/category/:slug", authenticateToken, authenticateAdmin, remove);

module.exports = router;
