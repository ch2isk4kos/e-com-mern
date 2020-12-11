const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.userCart = async (req, res) => {
  let products = [];
  const { cart } = req.body;

  const user = await User.findOne({ email: req.user.email }).exec();
  let existingCart = await Cart.findOne({ orderedBy: user._id }).exec();

  if (existingCart) {
    existingCart.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let u = {};
    u.product = cart[i]._id;
    u.count = cart[i].count;
    u.color = cart[i].color;

    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    u.price = price;

    products.push(u);
  }

  let totalAmount = 0;

  for (let i = 0; i < products.length; i++) {
    totalAmount = totalAmount + products[i].price + products[i].count;
  }

  let c = await new Cart({
    products: products,
    totalAmount: totalAmount,
    orderedBy: user._id,
  }).save();

  console.log("Saved:", c);
  res.json({ ok: true });
};
