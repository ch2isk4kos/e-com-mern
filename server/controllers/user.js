const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.userCart = async (req, res) => {
  const { cart } = req.body;
  const products = [];

  const user = await User.findOne({ email: req.user.email }).exec();
  const existingCart = await Cart.findOne({ orderedBy: user._id }).exec();

  if (existingCart) {
    existingCart.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let u = {};
    u.product = cart[i]._id;
    u.count = cart[i].count;
    u.color = cart[i].color;

    let productFromAtlas = await Product.findById(cart[i]._id)
      .select("price")
      .exec();
    u.price = productFromAtlas.price;

    products.push(u);
  }

  let totalAmount = 0;

  for (let i = 0; i < products.length; i++) {
    totalAmount = totalAmount + products[i].price * products[i].count;
  }

  let c = await new Cart({
    products: products,
    totalAmount: totalAmount,
    orderedBy: user._id,
  }).save();

  console.log("Saved:", c);
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();

    let cart = await Cart.findOne({ orderedBy: user._id })
      .populate("products.product", "_id name price")
      .exec();

    console.log("cart:", cart);

    let { products, totalAmount, totalAfterDiscount } = cart;

    res.json({
      products: products,
      totalAmount: totalAmount,
      totalAfterDiscount: totalAfterDiscount,
    });
  } catch (err) {
    res.status(400).json({
      errMsg: err.message,
    });
  }
};

exports.emptyUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  res.json(cart);
};

exports.userAddress = async (req, res) => {
  const address = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};
