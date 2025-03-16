import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";

require("dotenv").config();

// Khởi tạo ứng dụng app express
let app = express();
app.use(cors({ origin: true, credentials: true }));

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();
//connect to database


// lay port tu bien moi truong hoac dung port 6969
let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
});