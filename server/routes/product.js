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
  tally,
  create,
  read,
  update,
  remove,
  rating,
  related,
  search,
} = require("../controllers/product");

// Category Routes
// index
router.get("/products", index);
router.post("/products/list", list);
router.get("/products/tally", tally);
router.get("/products/:count", index);
// c
router.post("/product", authenticateToken, authenticateAdmin, create);
// r
router.get("/product/:slug", read);
// u
router.put("/product/:slug", authenticateToken, authenticateAdmin, update);
// d
router.delete("/product/:slug", authenticateToken, authenticateAdmin, remove);
// ratings
router.put("/product/:productId/rating", authenticateToken, rating);
// related products
router.get("/product/:productId/related", related);
// search product products
router.post("/products/query/filter", search);

module.exports = router;
