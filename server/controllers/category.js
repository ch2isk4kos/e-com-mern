const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Product = require("../models/Product");
const slugify = require("slugify");

exports.index = async (req, res) => {
  const c = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(c);
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({
    //   name: name,
    //   slug: slugify(name),
    // })
    //   .toLowerCase()
    //   .save();
    // res.json(category)
    res.json(
      await new Category({
        name: name,
        slug: slugify(name),
      }).save()
    );
  } catch (err) {
    res.status(400).send("Error with creating category");
  }
};

exports.read = async (req, res) => {
  let c = await Category.findOne({ slug: req.params.slug }).exec();
  let p = await Product.find({
    category: c,
  })
    .populate("category")
    .exec();

  res.json({
    category: c,
    products: p,
  });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const c = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    );
    res.json(c);
  } catch (err) {
    console.log("CATEGORY UPDATE FAIL:", err);
    res.status(400).send("Category Deletion Failed");
  }
  await Category.findOne({ slug: req.params.slug });
};

exports.remove = async (req, res) => {
  try {
    // mongoose also has 'findIdAndDelete()` if you're working with id's
    const c = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(c);
  } catch (err) {
    res.status(400).send("Category Deletion Failed");
  }
};

exports.getSubs = async (req, res) => {
  SubCategory.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log("Get Sub Category", err);
    res.json(subs);
  });
};
