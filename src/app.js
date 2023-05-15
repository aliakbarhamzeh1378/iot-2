const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const authRouter=require("./routes/user/authRouter");
const plantRouter=require("./routes/plant/plantRouter");
const masterRouter=require("./routes/master/masterRouter");
const slaveRouter=require("./routes/slave/slaveRouter");
const automatinoRouter=require("./routes/logic/logicRouter");


const path = require("path");
const cors=require("cors");

require('dotenv').config();
app.use(cors());

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/accounts",authRouter);
app.use("/plants",plantRouter);
app.use("/master",masterRouter)
app.use("/slaves" ,slaveRouter)
app.use("/logic",automatinoRouter);

const start=()=>{
    mongoose.connect(process.env.DB_URL);
    app.listen(process.env.HTTP_PORT)
}
start();

module.exports=app;
