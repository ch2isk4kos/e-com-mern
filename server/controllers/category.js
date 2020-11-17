const Category = require("../models/Category");
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
  res.json(c);
};

exports.update = async (req, res) => {};

exports.remove = async (req, res) => {
  try {
    // mongoose also has 'findIdAndDelete()` if you're working with id's
    const c = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(c);
  } catch (err) {
    res.status(400).send("Category Deletion Failed");
  }
};
