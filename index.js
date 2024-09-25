import express, { json } from "express";
import dotenv from 'dotenv';
import mongoose, { connect } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth/auth-routes.js";
import adminProductsRouter from "./routes/admin/product-route.js";
import adminOrderRouter from "./routes/admin/order-route.js";

import shopProductsRouter from "./routes/shop/products-routes.js";
import shopCartRouter from "./routes/shop/cart-routes.js";
import shopAddressRouter from "./routes/shop/address-routes.js";
import shopOrderRouter from "./routes/shop/order-routes.js";
import shopSearchRouter from "./routes/shop/search-routes.js";
import shopReviewRouter from "./routes/shop/review-routes.js";

import commonFeatureRouter from "./routes/common/feature-routes.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;
const databaseURL = process.env.DATABASE_URL

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

mongoose
    .connect(databaseURL)
    .then(() => console.log('DB Connection Successful'))
    .catch((err) => console.log(err.message));

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));