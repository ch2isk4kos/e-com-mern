const Category = require("../models/Category");
const slugify = require("slugify");

exports.index = async (req, res) => {};

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

exports.read = async (req, res) => {};

exports.update = async (req, res) => {};

exports.remove = async (req, res) => {};
