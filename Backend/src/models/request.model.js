/*

  1. Tags field not provided in frontend
  2. Single Size option provided in frontend , multiple required 

*/

import mongoose from "mongoose";

const productRequestSchema = new mongoose.Schema(
  {
    skuID: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["M", "F", "K"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      enum: ["anime", "boots", "sneakers", "sandals"],
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Seller",
    },
    tags: [
      {
        type: String,
      },
    ]
    
  },
  {
    timestamps: true,
  }
);

const sellerRequestSchema = new mongoose.Schema(
  {
    whatsappNumber: {
      type: String,
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    storeLogo: {
      type: String,
    },
    storeAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gstNumber: {
      type: String,
      validate: {
        validator: function (value) {
          // Check if the GST number has exactly 15 characters
          return value.length === 15;
        },
        message: (props) =>
          `${props.value} is not a valid GST number. It should have exactly 15 characters.`,
      },
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gstNumber: {
      type: String,
      validate: {
        validator: function (value) {
          // Check if the GST number has exactly 15 characters
          return value.length === 15;
        },
        message: (props) =>
          `${props.value} is not a valid GST number. It should have exactly 15 characters.`,
      },
      unique: true,
    },
    website: String,
    instagram: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

productRequestSchema.index({ skuID: 1 }, { unique: true });


const ProductRequest = new mongoose.model(
  "ProductRequest",
  productRequestSchema
);
const SellerRequest = new mongoose.model("SellerRequest", sellerRequestSchema);

export { ProductRequest, SellerRequest };
