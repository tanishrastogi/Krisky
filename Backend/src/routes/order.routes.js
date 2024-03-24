import { Router } from "express";
import {
    addOrder,
    orderTracking
} from "../controllers/order.controllers.js";

const router = Router();

router.route("/add-order").post(addOrder);
router.route("/order-tracking").post(orderTracking);

export default router; 