const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

exports.createPaymentIntent = async (req, res) => {
  //apply coupon
  //calculate price

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
