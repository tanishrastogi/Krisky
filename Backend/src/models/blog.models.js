import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
    },
    imageurl: {
      type: String,
      required: true,
    },
    content: {
        type: String,
        required:true
    },
    category:{
        type:String
    },
    productID:[{
        type:mongoose.Schema.Types.ObjectId,
    }]
}, {
    timestamps: true
});

const Blog = new mongoose.model("Blog", blogSchema);
export { Blog };
