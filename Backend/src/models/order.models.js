import mongoose from "mongoose";
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
  sellerID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Seller"
  }
});
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    orderItems: {
      type: [orderItemSchema],
    },
    orderPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: ["PENDING", "CANCELLED", "DELIVERED"],
      default: "PENDING",
    },
    paymentStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "COD",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    searchTags:[
      {
        type:String
      }
    ]
  },
  {
    timestamps: true,
  }
);
export const Order = mongoose.model("Order", orderSchema);
