const Coupon = require("../models/Coupon");

exports.index = async (req, res) => {
  try {
    const list = await Coupon.find({}).sort({ createdAt: -1 }).exec();
    res.json(list);
  } catch (err) {
    res.status(400).send("COUPON INDEX FAILED", err);
  }
};

exports.create = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body.coupon;
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (err) {
    console.log("COUPON CREATE", err);
    res.status(400).send("CREATE COUPON FAILED");
  }
};

exports.remove = async (req, res) => {
  try {
    const s = await Coupon.findByIdAndDelete(req.params.couponId).exec();
    res.json(s);
  } catch (err) {
    res.status(400).send("COUPON DELETE FAILED", err);
  }
};
