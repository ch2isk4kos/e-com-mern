const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    // brand: {
    //   type: ObjectId,
    //   ref: "Brand",
    // },
    brand: {
      type: String,
      trim: true,
      text: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxLength: 32,
      text: true,
    },
    quanitity: {
      type: Number,
      required: true,
      text: true,
    },
    // purchased: {
    //   type: Number,
    //   default: 0,
    // },
    color: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      maxLength: 256,
      text: true,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subcategories: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    // ratings: [
    //   {
    //     star: Number,
    //     reviewer: { type: ObjectId, ref: "User" },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
