const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const authRouter=require("./routes/user/authRouter");
const plantRouter=require("./routes/plant/plantRouter");
const path = require("path");
const cors=require("cors");

require('dotenv').config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/re_accounts",authRouter);
app.use("/re_plants",plantRouter);


const start=()=>{
    mongoose.connect(process.env.DB_URL);
    app.listen(process.env.HTTP_PORT)
}
start();

module.exports=app;
