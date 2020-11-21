const Product = require("../models/Product");
const slugify = require("slugify");

// exports.index = async (req, res) => {
//   const p = await Product.find({}).sort({ createdAt: -1 }).exec();
//   res.json(p);
// };

exports.index = async (req, res) => {
  const p = await Product.find({});
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
  let p = await Product.findOne({ slug: req.params.slug }).exec();
  res.json(p);
};

exports.update = async (req, res) => {
  const { product } = req.body;
  try {
    const p = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      { product: product, slug: slugify(product.name) },
      { new: true }
    );
    res.json(p);
  } catch (err) {
    console.log("PRODUCT UPDATE FAIL:", err);
    res.status(400).send("Product Deletion Failed");
  }
  await Product.findOne({ slug: req.params.slug });
};

exports.remove = async (req, res) => {
  try {
    // mongoose also has 'findIdAndDelete()` if you're working with id's
    const p = await Product.findOneAndDelete({ slug: req.params.slug });
    res.json(p);
  } catch (err) {
    res.status(400).send("Product Deletion Failed");
  }
};
