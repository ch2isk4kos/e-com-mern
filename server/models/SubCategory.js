const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Sub Category Name is Required",
      minlength: [2, "Sub Category Name Must Be Greater than 2 Characters"],
      maxlength: [32, "Sub Category Name Must Be Less than 32 Characters"],
    },
    slug: {
      type: String,
      unqiue: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: "Category", required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Sub", subCategorySchema);
