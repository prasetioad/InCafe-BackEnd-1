const db = require("../models");
const formatResult = require("../helpers/formatResult");
const { decodeToken } = require("../helpers/jwtHelper");
const OrderedProduct = db.ordered;
const Product = db.product;
const Trx = db.transaction;
const Promo = db.promo;

exports.input = (req, res) => {
  if (req.body.transactionId) {
    Trx.findOne({ where: { id: req.body.transactionId } }).then((checkTrx) => {
      if (checkTrx) {
        if (checkTrx.dataValues.statusOrder !== "Done") {
          Product.findOne({ where: { id: req.body.productId } })
            .then(async (result) => {
              const decode = decodeToken(req);
              req.body.userId = decode.userId;
              const promoId = checkTrx.promoId;
              if (promoId) {
                const resultPromo = await Promo.findOne({ where: { id: promoId } }).then(
                  (resultP) => resultP.dataValues
                );
                if (result) {
                  const sizePromo = JSON.parse(JSON.parse(resultPromo.size));
                  if (sizePromo.includes(req.body.sizeProduct)) {
                    OrderedProduct.create(req.body)
                      .then((resultOrder) => {
                        if (result.stock > 0) {
                          Product.update(
                            { stock: result.stock - 1 },
                            { where: { id: result.id } }
                          ).then(() => {
                            formatResult(res, 201, true, "Success Make Order", resultOrder);
                          });
                        } else {
                          formatResult(res, 500, false, "Product Out Of Stock", null);
                        }
                      })
                      .catch((err) => {
                        formatResult(res, 500, false, err, null);
                      });
                  } else {
                    formatResult(
                      res,
                      400,
                      false,
                      `Failed Using Promo Code ${resultPromo.name}, Please Check S&K Promo!`,
                      null
                    );
                  }
                } else {
                  formatResult(res, 404, false, "Product Not Found", null);
                }
              } else {
                OrderedProduct.create(req.body)
                  .then((resultOrder) => {
                    if (result.stock > 0) {
                      Product.update(
                        { stock: result.stock - 1 },
                        { where: { id: result.id } }
                      ).then(() => {
                        formatResult(res, 201, true, "Success Make Order", resultOrder);
                      });
                    } else {
                      formatResult(res, 500, false, "Product Out Of Stock", null);
                    }
                  })
                  .catch((err) => {
                    formatResult(res, 500, false, err, null);
                  });
              }
            })
            .catch(() => {
              formatResult(res, 500, false, "Internal Server Error", null);
            });
        } else {
          formatResult(res, 400, false, "Failed Process! Transaction Has Been Done", null);
        }
      } else {
        formatResult(res, 500, false, "Transaction ID Not Found", null);
      }
    });
  } else {
    formatResult(res, 400, false, "You Don't Have Transaction", null);
  }
};

exports.history = (req, res) => {
  const decode = decodeToken(req);
  const userId = decode.userId;
  let sort = req.query.sort ? req.query.sort.toUpperCase() : "DESC";
  OrderedProduct.findAll({ where: { userId }, order: [["createdAt", sort]] })
    .then(async (result) => {
      if (result.length > 0) {
        const newResult = [];
        for (let i in result) {
          let json;
          await Product.findOne({ where: { id: result[i].productId } }).then(
            async (resultProduct) => {
              if (resultProduct) {
                await Trx.findOne({ where: { id: result[i].transactionId } }).then((resultTrx) => {
                  json = {
                    id: result[i].id,
                    image: resultProduct.image,
                    name: resultProduct.name,
                    price: resultProduct.price,
                    status: resultTrx.statusOrder,
                  };
                  newResult.push(json);
                });
              }
            }
          );
        }
        formatResult(res, 200, true, "Success Get History Order", newResult);
      } else {
        formatResult(res, 404, false, "Cannot Find History Order", null);
      }
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};

exports.delete = (req, res) => {
  if (req.body.role === "admin") {
    OrderedProduct.destroy({ where: { id: req.params.id } })
      .then((result) => {
        if (result === 1) {
          formatResult(res, 200, true, "Success Delete Order", null);
        } else {
          formatResult(res, 404, false, "History Not Found", null);
        }
      })
      .catch(() => {
        formatResult(res, 500, false, "Internal Server Error", null);
      });
  } else {
    const decode = decodeToken(req);
    const userId = decode.userId;
    OrderedProduct.destroy({ where: { id: req.params.id, userId } }).then((result) => {
      console.log(result);
    });
  }
};
