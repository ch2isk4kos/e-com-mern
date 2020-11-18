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
router.get("/sub", index);
router.post("/sub", authenticateToken, authenticateAdmin, create);
router.get("/sub/:slug", read);
router.put("/sub/:slug", authenticateToken, authenticateAdmin, update);
router.delete("/sub/:slug", authenticateToken, authenticateAdmin, remove);

module.exports = router;
