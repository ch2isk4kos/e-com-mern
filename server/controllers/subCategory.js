const SubCategory = require("../models/SubCategory");
const slugify = require("slugify");

exports.index = async (req, res) => {
  res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());
};

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(
      await new SubCategory({ name, parent, slug: slugify(name) }).save()
    );
  } catch (err) {
    console.log("SUB CATEGORY CREATE", err);
    res.status(400).send("CREATE SUB CATEGORY FAILED");
  }
};

exports.read = async (req, res) => {
  // let s = await SubCategory.findOne({ slug: req.params.slug });
  // res.json(s);
  res.json(await SubCategory.findOne({ slug: req.params.slug }));
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("SUB CATEGORY UPDATE", err);
  }
};

exports.remove = async (req, res) => {
  try {
    const s = await SubCategory.findOneAndDelete({ slug: req.params.slug });
    res.json(s);
  } catch (err) {
    res.status(400).send("SUB CATEGORY DELETE", err);
  }
};
