var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("./models/connection");
require("dotenv").config();

//var indexRoute = require("./routes/indexRoute");
var usersRoute = require("./routes/userRoute");
var articleRoute = require("./routes/articleRoute");

var app = express();
const cors = require("cors");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use("/", indexRoute) à ajouter dans l'url;
app.use("/users", usersRoute);
app.use("/articles", articleRoute);

module.exports = app;
