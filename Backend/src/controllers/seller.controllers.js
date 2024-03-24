import { Address } from "../models/address.model.js";
import { Offer } from "../models/offer.model.js";
import { Order } from "../models/order.models.js";
import { Product } from "../models/product.models.js";
import { SellerRequest } from "../models/request.model.js";
import { ProductRequest } from "../models/request.model.js";
import { Seller } from "../models/seller.model.js";
import { User } from "../models/user.models.js";
import { ApiError, handleErr } from "../utils/ApiError.js";
import { ApiResponse, message } from "../utils/ApiResponse.js";
import { uploadOnAws } from "../utils/aws.js";
import fs from "fs";

const sellerRequest = async (req, res) => {
  try {
    const {
      userId,
      gstNumber,
      storeName,
      whatsappNumber,
      street,
      country,
      state,
      city,
      pincode,
    } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) return res.json(new ApiResponse(404, "user not found"));

    if (!req.file)
      return message(res, "res", 404, "Image not found , upload image");

    const logoImageUrl = await uploadOnAws(req.file.path);

    if (!logoImageUrl) {
      fs.unlinkSync(req.file.path);
      return res.json(new ApiResponse(400, "Unable to upload logo"));
    }

    fs.unlinkSync(req.file.path);

    const sellerAddress = await new Address({
      userId,
      recipientName: storeName,
      country,
      state,
      city,
      street,
      pincode,
    }).save();

    if (!sellerAddress)
      return res.json(new ApiResponse(400, "Unable to save address"));

    const seller = new SellerRequest({
      userID: user._id,
      storeAddress: sellerAddress._id,
      storeLogo: logoImageUrl,
      ...req.body,
    });
    await seller.save();
    if (!seller) return res.json(new ApiResponse(400, "Unable to save seller"));
    return res.json(new ApiResponse(200, seller, "Seller request sent"));
  } catch (err) {
    console.log(err.code);
    return res.json(new ApiError(400, err));
  }
};

// seller makes a request --->

// ---> request gets stored in DB --->

// ---> Admin dashboard will have an option to see all these requests --->

// ---> requests can be accepted or declined from dashboard --->

// ---> admin will be given an option to 1) add the qty to the existing product or 2) create new product --->

// ---> if admin chooses option 1 , quantity of whichever product admin chooses will be increased --->

// ---> if admin chooses option 2 , new product will be added to the DB

// ---> admin will have an option to edit the request parameters as per his need and requirements

const addImagesToProductRequest = async (req, res) => {
  const productImageUrl = await uploadOnAws(req.files[0].path);
  if (!productImageUrl) {
    return res.send(new ApiError(500, "Upload Failed"));
  }
  fs.unlinkSync(req.files[0].path);
  return res.json(new ApiResponse(200, productImageUrl, "Upload Success"));
};

const productAddRequest = async (req, res) => {
  const { userID } = req.body;
  try {
    const { images } = req.body;
    if (!images || images.length === 0) {
      return res.json(
        new ApiResponse(
          422,
          "You need to attach atleast 1 image of the product "
        )
      );
    }
    const seller = await Seller.findOne({ userID: userID });
    const user = await User.findOne({ _id: userID });

    if (!user) return res.json(new ApiResponse(404, "user not found"));
    if (!seller) return res.json(new ApiResponse(404, "seller not found"));

    if (user.role !== "seller")
      return res.json(new ApiResponse(404, "Given user is not a seller yet!!"));

    const request = new ProductRequest({ ...req.body, seller: seller._id });
    await request.save();

    return res.json(new ApiResponse(200, request, "Product Request Raised!"));
  } catch (err) {
    console.log(err);
    return res.json(new ApiError(400, err.message));
  }
};

/* this api is for adding offer to the existing product */
const addOfferToProduct = async (req, res) => {
  const { productID, sellerID, productPrice, quantity } = req.body;

  try {
    const product = await Product.findOne({ _id: productID }).populate("offers");
    if (!product) return res.json(new ApiError(422, "Invalid productID"));



    const offer = new Offer({
      productID,
      sellerID,
      price: productPrice,
      quantity,
    });

    await offer.save();
    console.log(offer._id);

    await Product.findByIdAndUpdate(productID, {
      $push: { offers: offer._id },
    });

    let price = []
    product.offers.forEach((offer) => {
      price.push(offer.price)
    })

    price.sort((a, b) => a - b);
    console.log(price[0])
    product.price = price[0];
    await product.save()


    await Seller.findByIdAndUpdate(sellerID, { $push: { offers: offer._id } });

    return res.json(new ApiResponse(200, offer, "offer added successfully"));
  } catch (error) {
    console.log(error)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.sellerID) {
      // Handle duplicate key error for sellerID
      return res.json(
        new ApiResponse(
          422,
          "This seller already have an offer in this product."
        )
      );
    }

    return res.json(new ApiError(400, error.message));
  }
};



const fetchRequests = async (req, res) => {
  const { sellerID } = req.body;
  try {

    const requests = await ProductRequest.find({ seller: sellerID })

    if (!requests || requests.length === 0) return new ApiResponse(404, "no requests found");

    return res.json(new ApiResponse(200, requests, `${requests.length} requests found.`));

  }
  catch (err) {
    return handleErr(res, err);
  }
}

const fetchRequestById = async (req, res) => {
  const { requestID } = req.body;
  try {

    if (!requestID) return res.json(new ApiResponse(422, "requestID needed"));

    const request = await ProductRequest.findOne({ _id: requestID });

    if (!request) return res.json(new ApiResponse(404, "product request not found"));

  }
  catch (err) {
    return handleErr(res, err);
  }
}

const fetchOffers = async (req, res) => {
  try {
    const { sellerID } = req.body;
    
    const seller = await Seller.findOne({ _id: sellerID })
      .populate({
        path:"offers",
        populate:"productID"
      });

    if (!seller) return res.json(new ApiResponse(404, "seller not found"));

    return res.json(new ApiResponse(200, seller.offers, "offers fetched successfully"))

  }
  catch (err) {
    return handleErr(res, err);
  }
}

const fetchOfferByID = async (req, res) => {
  try {

    const { offerID } = req.body;

    const offer = await Offer.findById(offerID);

    if (!offer) return res.json(new ApiResponse(404, "No offer with this id found. "))

    return res.json(new ApiResponse(200, offer));

  }
  catch (err) {
    return handleErr(res, err)
  }
}

const fetchOrders = async (req, res) => {
  try {
    const { sellerID } = req.body
    if (!sellerID) return res.json(new ApiResponse(422, "sellerID required!"))

    const seller = await Seller.findById(sellerID)
      .populate("orders")
    if (!seller) return res.json(new ApiResponse(404, "seller not found"))

    return res.json(new ApiResponse(200, seller.orders, `${seller.orders.length} orders fetched`));

  }
  catch (err) {
    return handleErr(res, err);
  }
}

const fetchOrderById = async (req, res) => {
  try {
    const { orderID } = req.body;
    if (!orderID) return res.json(new ApiResponse(422, "orderID required!"))

    const order = await Order.findById(orderID);
    if (!order) return res.json(new ApiResponse(404, "order not found"))

    return res.json(new ApiResponse(200, order, "order fetched successfully"));

  }
  catch (err) {
    return handleErr(res, err);
  }
}


export {
  sellerRequest,
  productAddRequest,
  addImagesToProductRequest,
  addOfferToProduct,
  fetchRequestById,
  fetchRequests,
  fetchOfferByID,
  fetchOffers,
  fetchOrders,
  fetchOrderById
};
