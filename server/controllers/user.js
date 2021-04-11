const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Coupon = require("../models/Coupon");
const Order = require("../models/Order");

//user cart
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

//user address
exports.userAddress = async (req, res) => {
  const address = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

//user coupon
exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  console.log("coupon: ", coupon);

  const validateCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validateCoupon === null) {
    return res.json({
      errMsg: "Invalid Coupon",
    });
  }
  console.log("validate coupon: ", validateCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, totalAmount } = await Cart.findOne({
    orderedBy: user._id,
  })
    .populate("products.product", "_id name price")
    .exec();

  console.log("products: ", products);
  console.log("total amount: ", totalAmount);
  console.log("discount: ", validateCoupon.discount);

  let totalAfterDiscount = (
    totalAmount -
    (totalAmount * validateCoupon.discount) / 100
  ).toFixed(2); // 24.99

  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();

  res.json(totalAfterDiscount);
};

//user orders
exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();
  const { products } = await Cart.findOneAndRemove({
    orderedBy: user._id,
  }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  //decrement quanity/increment purchased from product inventory
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, //IMPORTANT: item.product
        // update: { $inc: { quantity: -item.count, purchased: +item.count } }, //mongo atlas error: can not increment purchased value of null -> create new products in admin then test
        update: { $inc: { quantity: -item.count } },
      },
    };
  });

  let inventory = await Product.bulkWrite(bulkOption, {});
  console.log("Inventory: ", inventory);

  console.log("New Order Saved: ", newOrder);
  res.json({ ok: true });
};

exports.orders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderedBy: user._id })
    .populate("products.product")
    .exec();

  res.json(userOrders);
};
