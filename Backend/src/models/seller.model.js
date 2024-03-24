import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  whatsappNumber: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
    required: true,
    unique: true,
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
    unique:true,
    ref: "User",
    required: true,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  offers:{
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Offer",
    },
  website: String,
  instagram: String,
  notes: String,
});



const Seller = new mongoose.model("Seller", sellerSchema);

export { Seller };
