import { Blog } from "../models/blog.models.js";
import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


import {
  deleteFromAws,
  uploadOnAws
} from "../utils/aws.js";

import fs from "fs";

const fetchBlogById = async (req, res) => {
  const { blogID } = req.body;
  try {
    const blog = await Blog.findOne({ _id: blogID });
    if (!blog) {
      return res.json(new ApiResponse((404, "Blog not found")));
    }

    res.json(new ApiResponse(200, blog, "Blog fetched successfully"));

  }
  catch (err) {
    throw new ApiError(400, "Error fetching the blog", err);
  }
};

const fetchAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(new ApiResponse(200, blogs));
  }
  catch (err) {
    res.json(new ApiError(400, err.message))
  }
}

const addBlog = async (req, res) => {
  const { content, blogTitle, image , category } = req.body;
  try {
    const blogImageUrl = await uploadOnAws(req.file.path);
    if (!blogImageUrl) {
      fs.unlinkSync(req.file.path);
      return res.json(new ApiResponse(400, "Unable to upload"));
    }
    else {
      fs.unlinkSync(req.file.path);
      const blogs = await Blog.find({})
      if (!blogTitle) {
        const length = blogs.length;

        const blog = new Blog({
          blogTitle: `Blog ${length + 1}`,
          content,
          category:category,
          imageurl: blogImageUrl
        })
        await blog.save();
      }
      else {
        const blog = new Blog({
          blogTitle,
          content,
          category:category,
          imageurl: blogImageUrl
        })
        await blog.save();
      }
      return res.json(new ApiResponse(200 , 'blog uploaded successfully'))
    }

  }
  catch (err) {
    return res.json(new ApiError(400, err.message))
  }
}


const editBlogImage = async (req, res) => {
  const { blogID } = req.body;
  try {
    const blog = await Blog.findOne({ _id: blogID })
    const imageUrl = blog.imageurl;
    const split = imageUrl.split("/")
    const deletedImage = await deleteFromAws(split[split.length - 1]);
    if(!deletedImage) return res.json(new ApiResponse(422 , "unable to delete image"));
    
    const blogImageUrl = await uploadOnAws(req.file.path);
    if (!blogImageUrl) {
      res.json(new ApiResponse(422, "unable to upload"))
      fs.unlinkSync(req.file.path)
    }
    else {
      blog.imageurl = blogImageUrl;
      await Blog.findByIdAndUpdate({ _id: blogID }, { $set: { imageurl: blogImageUrl } }, { new: true });
      fs.unlinkSync(req.file.path)
      res.json(new ApiResponse(200, { deletedImage, updatedImage: blogImageUrl }))
    }
  }
  catch (err) {
    res.json(new ApiError(400, err.message));
  }
};

const editBlogBody = async (req, res) => {
  try {
    const { blogID, blogTitle, content } = req.body;
    const blog = await Blog.findOne({ _id: blogID });
    // console.log(req.body)
    if (!blog) {
      res.json(new ApiResponse(404, "Blog not found!!"))
    }
    else {
      const updated = await Blog.findByIdAndUpdate({ _id: blogID },
        {
          $set: {
            bodyTitle: blogTitle,
            content
          }
        },
        { new: true })

      res.json(new ApiResponse(200, updated, "blog updated successfully"));
    }
  }
  catch (err) {
    res.json(new ApiError(400, err.message));
  }
}

const attachProductToBlog = async(req,res)=>{
  const {productArray , blogID} = req.body;
  try{
    const blog = await Blog.findOne({_id:blogID})
    if(!blog) return res.json(new ApiResponse(404 , "no product found"))
    productArray.forEach(async(product)=>{
      blog.productID.push(product);
    })
    await blog.save();
  }
  catch(err){
    return res.json(new ApiError(400 , err.message));
  }
}

const deleteBlog = async (req, res) => {
  const { blogID } = req.body;
  const blog = await Blog.findOne({ _id: blogID });
  try {
    if (!blog) {
      return res.json(new ApiResponse(404, "blog not found"));
    }
    const imageUrl = blog.imageurl

    await deleteFromAws(imageUrl);

    const deleted = await Blog.findByIdAndDelete({ _id: blogID });
    res.json(new ApiResponse(200, deleted, "blog deleted successfully"));
  } catch (err) {
    throw new ApiError(400, "Error deleting the blog", err.message);
  }
};


export {
  addBlog,
  editBlogImage,
  editBlogBody,
  deleteBlog,
  fetchBlogById,
  fetchAllBlog,
  attachProductToBlog
};
