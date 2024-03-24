import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
  verifyEmailOtp,
  sendMobileOtp,
  verifyMobileOtp,
  sendEmailOtp,
  findByID,
  findByEmail,
} from "../controllers/user.controllers.js";

import {
  addListName,
  addToCart,
  addToList,
  deleteFromCart,
  removeFromList,
  removeList,
  removeFromCart,
  getCartByUser,
} from "../controllers/cart.controllers.js";

import {
  getProductById,
  getProducts,
  getRecentProducts,
  searchBarProducts,
} from "../controllers/product.controllers.js";

import { fetchAllBlog, fetchBlogById } from "../controllers/blog.controllers.js";
import { sellerRequest } from "../controllers/seller.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/send-email-otp").post(sendEmailOtp);
router.route("/verify-email-otp").post(verifyEmailOtp);
router.route("/send-mobile-otp").post(sendMobileOtp);
router.route("/verify-mobile-otp").post(verifyMobileOtp);
router.route("/login").post(loginUser);
router.route("/fetch-by-id").post(findByID);
router.route("/fetch-by-email").post(findByEmail);
router.route("/add-to-cart").post(addToCart);
router.route("/remove-from-cart").post(removeFromCart);
router.route("/get-user-cart").post(getCartByUser);
router.route("/delete-from-cart").post(deleteFromCart);
router.route("/add-list-name").post(addListName); 
router.route("/add-to-list").post(addToList);
router.route("/remove-list").post(removeList);
router.route("/remove-product-from-list").post(removeFromList);
router.route("/get-current-user").get(verifyJWT, getCurrentUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/get-recent-products").get(getRecentProducts);
router.route("/get-product-by-id").post(getProductById);
router.route("/get-products").get(getProducts);
router.route("/search-products").post(searchBarProducts);
router.route("/fetch-blogs").get(fetchAllBlog);
router.route("/fetch-blog-by-id").post(fetchBlogById);

/* Seller creation requests */
router
  .route("/create-request/seller")
  .post(upload.single("storeLogo"), sellerRequest);

export default router;
