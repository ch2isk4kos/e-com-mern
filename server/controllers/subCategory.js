const SubCategory = require("../models/SubCategory");
const slugify = require("slugify");

exports.index = async (req, res) => {
  const c = await SubCategory.find({}).sort({ createdAt: -1 }).exec();
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
      await new SubCategory({
        name: name,
        slug: slugify(name),
      }).save()
    );
  } catch (err) {
    res.status(400).send("Error with creating sub category");
  }
};

exports.read = async (req, res) => {
  let c = await SubCategory.findOne({ slug: req.params.slug }).exec();
  res.json(c);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const c = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    );
    res.json(c);
  } catch (err) {
    console.log("SUB CATEGORY UPDATE FAIL:", err);
    res.status(400).send("Sub-Category Deletion Failed");
  }
  await SubCategory.findOne({ slug: req.params.slug });
};

exports.remove = async (req, res) => {
  try {
    // mongoose also has 'findIdAndDelete()` if you're working with id's
    const c = await SubCategory.findOneAndDelete({ slug: req.params.slug });
    res.json(c);
  } catch (err) {
    res.status(400).send("Sub-Category Deletion Failed");
  }
};
