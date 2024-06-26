const express = require("express");
const app = express();
const cookieParser = require("cookie-parser"); 
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config({path:"backend/.env"});

const errorMiddleware = require("./middlewares/error"); 

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

//middleware for error
app.use(errorMiddleware);

module.exports = app


