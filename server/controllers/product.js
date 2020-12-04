const Product = require("../models/Product");
const slugify = require("slugify");
const User = require("../models/User");

// exports.index = async (req, res) => {
//   const p = await Product.find({}).sort({ createdAt: -1 }).exec();
//   res.json(p);
// };

exports.index = async (req, res) => {
  const p = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subcategories")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(p);
};

// exports.list = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subcategories")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();
//     res.json(products);
//   } catch (err) {
//     res.status(400).json({
//       errMsg: err.message,
//     });
//   }
// };

// with pagination
exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const current = page || 1;
    const per = 3;

    const products = await Product.find({})
      .skip((current - 1) * per)
      .populate("category")
      .populate("subcategories")
      .sort([[sort, order]])
      .limit(per)
      .exec();
    res.json(products);
  } catch (err) {
    res.status(400).json({
      errMsg: err.message,
    });
  }
};

exports.tally = async (req, res) => {
  let p = await Product.find({}).estimatedDocumentCount().exec();
  res.json(p);
};

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.name);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    // res.status(400).send("Error with creating product");
    res.status(400).json({
      errMsg: err.message,
    });
  }
};

exports.read = async (req, res) => {
  let p = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subcategories")
    .exec();
  res.json(p);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    const p = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true } // sends new data to client
    ).exec();
    res.json(p);
  } catch (err) {
    console.log("PRODUCT UPDATE FAIL:", err);
    // return res.status(400).send("Product Deletion Failed");
    res.status(400).json({
      errMsg: err.message,
    });
  }
  // await Product.findOne({ slug: req.params.slug });
};

exports.remove = async (req, res) => {
  try {
    // mongoose also has 'findIdAndDelete()` if you're working with id's
    const p = await (
      await Product.findOneAndDelete({ slug: req.params.slug })
    ).exec();
    res.json(p);
  } catch (err) {
    res.status(400).send("Product Deletion Failed");
  }
};

exports.rating = async (res, req) => {
  const p = await Product.findById(req.params.productId).exec();
  const u = await User.findOne({ email: req.user.email }).exec();
  const { rating } = req.body;

  let currentRating = p.ratings.find((r) => r.userId === u._id.toString());

  // if !rating from user: push to ratings
  if (currentRating === undefined) {
    let productRating = await Product.findOneAndUpdate(
      p._id,
      {
        // mongodb method: $push
        $push: { ratings: { rating: rating, userId: u._id } },
      },
      { new: true }
    ).exec();

    console.log("rating updated", productRating);
    res.json(productRating);
  }

  // if rating from user: update ratings
  let updateRating;
};
