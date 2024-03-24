import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  sellerID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Seller",
    // required:true
  }
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

export const Cart = new mongoose.model("Cart", cartSchema);
