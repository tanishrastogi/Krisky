import { Router } from "express";
import {
  makePayment,
  verifyPayment,
  getKey,
  fetchall,
  fetchPayment,
} from "../controllers/payment.controllers.js";

const router = Router();

router.route("/make-payment").post(makePayment);
router.route("/verify-payment/").post(verifyPayment);
router.route("/get-key").get(getKey);
router.route("/fetch-all").get(fetchall);
router.route("/fetch-by-id").post(fetchPayment);

export default router;
