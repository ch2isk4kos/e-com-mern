const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.userCart = async (req, res) => {
  const { cart } = req.body;
  let products = [];

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

  let total = 0;

  for (let i = 0; i < products.length; i++) {
    total = total + products[i].price + products[i].count;
  }

  let c = await new Cart({
    products,
    total,
    orderedBy: user._id,
  }).save();

  console.log("Saved:", c);
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id name price totalAfterDiscount")
    .exec();

  const { products, totalAmount, totalAfterDiscount } = cart;

  res.json({
    products,
    totalAmount,
    totalAfterDiscount,
  });
};
