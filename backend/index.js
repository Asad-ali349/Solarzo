import express from "express";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//routes importing
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";

import cloudinary from 'cloudinary';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname,'public')))
app.use('/static',express.static('public'))

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors({
  origin: 'https://solarzo.vercel.app'
}));

//Defining Port on which our page is load.
const PORT = process.env.PORT || 5000;

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Solarzo App API</h1>");
});

mongoose.connect(process.env.CONNECTION_URL , {useNewUrlParser: true,useUnifiedTopology: true}) 
.then(
  () => app.listen(PORT, console.log(`Server running on port: ${PORT}`))
).catch((err) => {
  console.log("Mongodb connection error", err);
});


export default app;
