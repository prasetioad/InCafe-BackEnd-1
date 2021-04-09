const express = require("express");
const promo  = require("./promo");
const Route = express.Router();
const feedback = require("./feedback")
const product = require("./product")
const user = require("./user");

Route.use("/users", user);
Route.use("/product", product);
Route.use("/feedback", feedback);
Route.use("/promo", promo)

module.exports = Route;
