import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";

import {
  sellerRequest,
  productAddRequest,
  addOfferToProduct,
  addImagesToProductRequest,
  fetchRequestById,
  fetchRequests,
  fetchOffers,
  fetchOfferByID,
  fetchOrders,
  fetchOrderById,
} from "../controllers/seller.controllers.js";

const router = Router();

/* product request */
router.route("/create-request/product").post(productAddRequest); // raise a request to add a product.                         

router
  .route("/add-product-image")
  .post(upload.array("image"), addImagesToProductRequest); // add images to the product request

router.route("/add-offer-to-product").post(addOfferToProduct); // add offer to product

router.route("/fetch-requests/id").post(fetchRequestById) // fetch product request using id

router.route("/fetch-requests/all").post(fetchRequests)   // fetch all product requests raised by that particular seller

router.route("/fetch-offers/id").post(fetchOfferByID) // fetch offers using id

router.route("/fetch-offers/all").post(fetchOffers) // fetch all offers of that particular seller

router.route("/fetch-orders/all").post(fetchOrders) // fetch all orders of that particular seller

router.route("/fetch-orders/id").post(fetchOrderById) // fetch order using id


export default router;
