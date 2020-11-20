const Product = require("../models/Product");
const slugify = require("slugify");

exports.index = async (req, res) => {
  const c = await Product.find({}).sort({ createdAt: -1 }).exec();
  res.json(c);
};

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.name);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    res.status(400).send("Error with creating product");
  }
};

exports.read = async (req, res) => {
  let c = await Product.findOne({ slug: req.params.slug }).exec();
  res.json(c);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const c = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    );
    res.json(c);
  } catch (err) {
    console.log("PRODUCT UPDATE FAIL:", err);
    res.status(400).send("Product Deletion Failed");
  }
  await Product.findOne({ slug: req.params.slug });
};

exports.remove = async (req, res) => {
  try {
    // mongoose also has 'findIdAndDelete()` if you're working with id's
    const c = await Product.findOneAndDelete({ slug: req.params.slug });
    res.json(c);
  } catch (err) {
    res.status(400).send("Product Deletion Failed");
  }
};
