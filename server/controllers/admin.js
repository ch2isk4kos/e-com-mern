const Order = require("../models/Order");

exports.orders = async (req, res) => {
  let orders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();
  res.json(orders);
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updateOrderStatus = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updateOrderStatus);
};
