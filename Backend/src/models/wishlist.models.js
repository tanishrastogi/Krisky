import mongoose from "mongoose";
const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        unique: true,
    },
}, {
    timestamps: true,
});
// Enforcing uniqueness of products
wishlistSchema.index({ user: 1, product: 1 }, { unique: true });
export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
