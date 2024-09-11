import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import userRoute from "./routes/User.js";
import authRoute from "./routes/Auth.js";
import productRoute from "./routes/Product.js";
import serviceRoute from "./routes/Service.js";
import orderRoute from "./routes/Order.js";
import cartRoute from "./routes/Cart.js";

//app
const app = express();
const httpServer = createServer(app);

//mongoose connection
mongoose.set('strictQuery', true);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    handleError(error);
  }
}

// Define the handleError function
const handleError = (error) => {
    console.error("Database connection error:", error);
    process.exit(1);
}

//middleware
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001", "https://zeal-energy.netlify.app", "https://zeal-admin.netlify.app"], credentials: true }));
app.use(express.json());

//body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/services", serviceRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);

//port section
const PORT = process.env.OFFLINE_PORT || 8800;
httpServer.listen(PORT, () => {
  connectDB();
  console.log("Backend server is running!");
});

