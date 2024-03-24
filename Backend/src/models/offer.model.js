import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    },
    sellerID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Seller",
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number
    }
})

offerSchema.index({ sellerID: 1, productID: 1 }, { unique: false });

const Offer = new mongoose.model('Offer' , offerSchema);

export {Offer};