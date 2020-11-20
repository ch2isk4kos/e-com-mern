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
} = require("../controllers/product");

// Category Routes
router.get("/products", index);
router.post("/product", authenticateToken, authenticateAdmin, create);
router.get("/product/:slug", read);
router.put("/product/:slug", authenticateToken, authenticateAdmin, update);
router.delete("/product/:slug", authenticateToken, authenticateAdmin, remove);

module.exports = router;
