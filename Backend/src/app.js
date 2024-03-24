import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import orderRouter from "./routes/order.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import sellerRouter from './routes/seller.routes.js';
import productRouter from './routes/product.routes.js';
import dotenv from "dotenv";

const app = express();
dotenv.config();

// middlewares

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    exposedHeaders: ["set-cookie"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/user/order", orderRouter);
app.use("/api/user/payments", paymentRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/admin", adminRouter);

export { app };
