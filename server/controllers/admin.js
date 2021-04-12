const User = require("../models/User");
const Order = require("../models/Order");

exports.orders = async (req, res) => {
  let orders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();
  res.json(orders);
};
