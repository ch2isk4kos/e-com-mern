const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema();

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [3, "Must be greater than 3 characters"],
      maxlength: [32, "Must be less than 32 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", subCategorySchema);
