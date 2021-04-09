const express = require("express");
const promo  = require("./promo");
const Route = express.Router();
const feedback = require("./feedback")
const product = require("./product")
const product = require("./product");
const user = require("./user");
const order = require("./ordered");
const trx = require("./transaction");

Route.use("/users", user);
Route.use("/product", product);
Route.use("/feedback", feedback);
Route.use("/promo", promo)
Route.use("/order", order);
Route.use("/trx", trx);

module.exports = Route;
