const Product = require("../models/Product");
const User = require("../models/User");
const slugify = require("slugify");
const { aggregate } = require("../models/User");

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

exports.rating = async (req, res) => {
  console.log("REQUEST PARAMS:", req.params);
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { rating } = req.body;

  let currentRating = product.ratings.find(
    (rating) => rating.ratedBy.toString() === user._id.toString()
  );

  // if !rating from user: push ratings object
  if (currentRating === undefined) {
    let productRating = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { rating, ratedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("product rated:", productRating);
    res.json(productRating);
  } else {
    // if rating from user: update ratings object
    let updateRating = await Product.updateOne(
      { ratings: { $elemMatch: currentRating } },
      { $set: { "ratings.$.rating": rating } },
      { new: true }
    ).exec();
    console.log("product rating updated:", updateRating);
    res.json(updateRating);
  }
};

exports.related = async (req, res) => {
  const p = await Product.findById(req.params.productId).exec();
  const r = await Product.find({
    _id: { $ne: p._id },
    category: p.category,
  })
    .limit(3)
    .populate("category")
    .populate("subcategories")
    .populate("ratedBy")
    .exec();
  res.json(r);
};

// search response methods
const handleQuery = async (req, res, query) => {
  const p = await Product.find({ $text: { $search: query } }) // text-base query search
    .populate("category", "_id name")
    .populate("subcategories", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(p);
};

const handlePrice = async (req, res, price) => {
  try {
    let p = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subcategories", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(p);
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let p = await Product.find({ category: category })
      .populate("category", "_id name")
      .populate("subcategories", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(p);
  } catch (err) {
    console.log(err);
  }
};

const handleRatings = (req, res, ratings) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAvg: {
          $floor: { $avg: "$ratings.rating" },
        },
      },
    },
    {
      $match: { floorAvg: ratings },
    },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR:", err);
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subcategories", "_id name")
        .populate("ratedBy", "_id name")
        .exec((err, products) => {
          if (err) console.log("PRODUCT ERROR:", err);
          res.json(products);
        });
    });
};

const handleSubCategories = async (req, res, sub) => {
  const p = await Product.find({ subcategories: sub })
    .populate("category", "_id name")
    .populate("subcategories", "_id name")
    .populate("ratedBy", "_id name")
    .exec();
  res.json(p);
};

exports.search = async (req, res) => {
  const { query, price, category, ratings, sub } = req.body;

  if (query) {
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    await handlePrice(req, res, price);
  }

  if (category) {
    await handleCategory(req, res, category);
  }

  if (ratings) {
    await handleRatings(req, res, ratings);
  }

  if (sub) {
    await handleSubCategories(req, res, sub);
  }
};
