const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const accountRouter = require("../src/routes/register/registerRouter");
const reset = require("../src/routes/reset_password/resetRouter");

// const plantRouter = require("./routes/plants");
const path = require("path");
var cors = require("cors");

require("dotenv").config();
app.use(cors());

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


require("./routes")(app);
const start = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/greenhouse");
  app.listen(3000);
};

start();

module.exports = app;
