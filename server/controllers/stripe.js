const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

exports.createPaymentIntent = async (req, res) => {
  //apply coupon
  //calculate price

  //find user
  const user = await User.findOne({ email: req.user.email }).exec();
  //get total amount of user cart
  const cartItems = await Cart.findOne({ orderedBy: user._id }).exec();

  console.log("Cart Items: ", cartItems);

  //create payment intent with order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartItems.totalAmount * 100,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
