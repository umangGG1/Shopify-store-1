import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/index";
import shopify from "./shopify.server";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use("/api", productRoutes);

app.use(shopify.authPathPrefix, shopify.authRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
