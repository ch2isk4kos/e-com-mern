const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

exports.createPaymentIntent = async (req, res) => {
  console.log("Request Body: ", req.body);
  console.log("Coupon Applied: ", req.body.isCouponApplied);

  const { isCouponApplied } = req.body;

  //find user
  const user = await User.findOne({ email: req.user.email }).exec();
  //get total amount from all items in user cart
  const cartItems = await Cart.findOne({ orderedBy: user._id }).exec();

  console.log("Cart Items: ", cartItems);

  const totalAfterDiscount = cartItems.totalAfterDiscount;
  console.log("Total After Discount: ", totalAfterDiscount);

  const totalAmount = cartItems.totalAmount;
  console.log("Total Amount: ", totalAmount);

  let purchaseAmount = 0;

  if (isCouponApplied && totalAfterDiscount) {
    purchaseAmount = Math.round(totalAfterDiscount * 100);
  } else {
    purchaseAmount = Math.round(totalAmount * 100);
  }

  //create payment intent with order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: purchaseAmount,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    items: cartItems,
    payable: purchaseAmount,
  });
};
