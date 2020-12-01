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
router.get("/products/:count", index);

router.post("/product", authenticateToken, authenticateAdmin, create);
router.put("/product/:slug", authenticateToken, authenticateAdmin, update);
router.delete("/product/:slug", authenticateToken, authenticateAdmin, remove);

module.exports = router;
