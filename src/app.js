const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const authRouter=require("./routes/user/authRouter");
const plantRouter=require("./routes/plant/plantRouter");
const slaveRouter=require("./routes/slave/slaveRouter");
const path = require("path");
const cors=require("cors");
const cookieParser = require("cookie-parser")
require('dotenv').config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/accounts",authRouter);
app.use("/plants",plantRouter);
app.use("/slaves" ,slaveRouter)


const start=()=>{
    mongoose.connect(process.env.DB_URL);
    app.listen(process.env.HTTP_PORT)
}
start();

module.exports=app;
