import { Offer } from "../models/offer.model.js";
import { Product } from "../models/product.models.js";
import { ProductRequest } from "../models/request.model.js";
import { Seller } from "../models/seller.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteFromAws } from "../utils/aws.js";

const handleErr = (res, err) => {
  console.log(err);
  return res.json(new ApiError(400, err.message));
};

const getProductRequests = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const requests = await ProductRequest.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(
      new ApiResponse(200, { requests, page }, "requests fetched successfully")
    );
  } catch (err) {
    return res.json(new ApiError(400, err.message));
  }
};

/* this api is for editing the product request */
const editProductRequest = async (req, res) => {
  const { requestID } = req.body;
  try {
    const request = await ProductRequest.findOne({ _id: requestID });
    if (!request)
      return res.json(new ApiResponse(404, "product request not found"));

    const updatedRequest = await ProductRequest.findByIdAndUpdate(
      requestID,
      req.body
    );

    return res.json(new ApiResponse(200, updatedRequest));
  } catch (err) {
    return handleErr(res, err);
  }
};

/* this api is for accepting the request and hence adding a new product */
const addProductViaRequest = async (req, res) => {
  const { requestID } = req.body;
  try {
    const request = await ProductRequest.findOne({ _id: requestID });
    if (!request)
      return res.json(new ApiResponse(404, "product request not found"));

    const {
      skuID,
      gender,
      description,
      title,
      price,
      brand,
      size,
      category,
      color,
      stock,
      seller,
      tags,
      images,
    } = request;

    const product = new Product({
      skuID,
      gender,
      description,
      title,
      brand,
      size,
      category,
      color,
      seller,
      tags,
      images,
    });
    await product.save();

    const offer = new Offer({
      price,
      quantity: stock,
      sellerID: request.seller,
      productID: product._id,
    });

    await offer.save();

    await Product.findByIdAndUpdate(product._id, {
      $push: { offers: offer._id },
    });

    await Seller.findByIdAndUpdate(seller , {
      $push:{offers:offer._id}
    })

    product.price = price;
    await product.save();

    await ProductRequest.findByIdAndDelete(requestID);

    return res.json(200, product, "product added successfully!");
  } catch (err) {
    console.log(err);
    return handleErr(res, err);
  }
};


/* this api is for declining the product request */
const declineProductRequest = async (req, res) => {
  const { requestID } = req.body;
  try {
    const request = await ProductRequest.findOne({ _id: requestID });
    if (!request)
      return res.json(new ApiResponse(404, "product request not found"));

    request.images.forEach(async (image) => {
      await deleteFromAws(image);
    });

    const deletedRequest = await ProductRequest.findByIdAndDelete(requestID);
    return res.json(
      new ApiResponse(200, deletedRequest, "request declined successfully")
    );
  } catch (err) {
    return handleErr(res, err);
  }
};

/* this api is for deleting an image in product request */
const deleteProductRequestImage = async (req, res) => {
  const { imageLink, requestID } = req.body;
  try {
    const request = await ProductRequest.findOne({ _id: requestID });

    if (!request)
      return res.json(new ApiResponse(404, "product request not found"));

    const index = request.images.findIndex((item) => {
      return item === imageLink;
    });

    if (index !== -1) {
      await deleteFromAws(request.images[index]);
      request.images = request.images.filter((image) => {
        return image !== imageLink;
      });

      await request.save();
      return res.json(new ApiResponse(200, request, "image deleted"));
    }
  } catch (err) {
    return handleErr(res, err);
  }
};

const getProductRequestById = async (req, res) => {
  try {
    const { requestID } = req.body;
    const request = await ProductRequest.findById(requestID);

    if (!request)
      return res.json(new ApiResponse(404, "Product Request not found"));

    return res.json(
      new ApiResponse(200, request, "request fetched successfully")
    );
  } catch (err) {
    return handleErr(res, err);
  }
};

const handleChangeInProduct = async (req, res) => {
  try {
  } catch (err) {
    return handleErr(res, err);
  }
};

export {
  getProductRequests,
  getProductRequestById,
  addProductViaRequest,
  editProductRequest,
  deleteProductRequestImage,
  declineProductRequest,
};
