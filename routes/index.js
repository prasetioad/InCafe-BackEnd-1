const express = require("express");
const Route = express.Router();
const product = require("./product");
const user = require("./user");
const order = require("./ordered");
const trx = require("./transaction");

Route.use("/users", user);
Route.use("/product", product);
Route.use("/order", order);
Route.use("/trx", trx);

module.exports = Route;
