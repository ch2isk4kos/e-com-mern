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
  list,
  create,
  read,
  update,
  remove,
  tally,
} = require("../controllers/product");

// Category Routes
router.get("/products", index);
router.post("/products/list", list);
router.get("/products/tally", tally);
router.get("/products/:count", index);
router.post("/product", authenticateToken, authenticateAdmin, create);
router.get("/product/:slug", read);
router.put("/product/:slug", authenticateToken, authenticateAdmin, update);
router.delete("/product/:slug", authenticateToken, authenticateAdmin, remove);

module.exports = router;
