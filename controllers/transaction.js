const db = require("../models");
const formatResult = require("../helpers/formatResult");
const { decodeToken } = require("../helpers/jwtHelper");
const Trx = db.transaction;
const User = db.user;
const Order = db.ordered;
const Promo = db.promo;

exports.input = (req, res) => {
  const decode = decodeToken(req);
  req.body.userId = decode.userId;
  req.body.totalPayment =
    parseInt(req.body.subTotal) + parseInt(req.body.tax) + parseInt(req.body.postageCost);
  User.findOne({ where: { userId: decode.userId } }).then((resultCheckUser) => {
    if (resultCheckUser) {
      if (req.body.promoId) {
        Promo.findOne({ where: { id: req.body.promoId } }).then((resultCheckPromo) => {
          if (resultCheckPromo) {
            const discount = (req.body.subTotal * parseInt(resultCheckPromo.discount)) / 100;
            req.body.totalPayment =
              discount >= parseInt(resultCheckPromo.maxDiscount)
                ? req.body.totalPayment - parseInt(resultCheckPromo.maxDiscount)
                : req.body.totalPayment - discount;
            const deliveryMethod = JSON.parse(JSON.parse(resultCheckPromo.deliveryMethod));
            const expPromo = resultCheckPromo.expiredDate;
            if (
              parseInt(req.body.subTotal) >= parseInt(resultCheckPromo.minPrice) &&
              deliveryMethod.includes(req.body.deliveryMethod) &&
              new Date().getDate() <= expPromo
            ) {
              Trx.create(req.body).then((result) => {
                formatResult(res, 201, true, "Success", result);
              });
            } else {
              formatResult(
                res,
                400,
                false,
                `Failed Using Promo Code ${resultCheckPromo.name}, Please Check S&K Promo!`,
                null
              );
            }
          } else {
            formatResult(res, 404, false, "Promo Code Not Found");
          }
        });
      } else {
        Trx.create(req.body).then((result) => {
          formatResult(res, 201, true, "Success", result);
        });
      }
    }
  });
};

exports.getProcessTrx = (req, res) => {
  Trx.findAll({ where: { statusOrder: "Process" } })
    .then(async (result) => {
      if (result.length > 0) {
        const newResult = [];
        for (let i in result) {
          const user = await User.findOne({ where: { userId: result[i].userId } });
          newResult.push({
            ...result[i].dataValues,
            nameUser: user.dataValues.displayName,
            addressUser: user.dataValues.address,
            phoneUser: user.dataValues.phone,
          });
        }
        formatResult(res, 200, true, "Success", newResult);
      } else {
        formatResult(res, 404, false, "No Available Transactions");
      }
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};

exports.doneTrx = (req, res) => {
  const id = req.params.id;
  Trx.update({ statusOrder: "Done" }, { where: { id } })
    .then((resultUpdate) => {
      if (resultUpdate[0] === 1) {
        Trx.findOne({ where: { id } })
          .then((result) => {
            formatResult(res, 200, true, "Transaction Has Done", result);
          })
          .catch((err) => {
            formatResult(res, 500, err, null);
          });
      } else {
        formatResult(res, 400, false, "Transaction Not Update", null);
      }
    })
    .catch((err) => {
      formatResult(res, 500, err, null);
    });
};

exports.deleteTrx = async (req, res) => {
  const id = req.params.id;
  Trx.destroy({ where: { id } })
    .then((result) => {
      if (result === 1) {
        Order.destroy({ where: { transactionId: id } })
          .then(() => {
            formatResult(res, 200, true, "Success Delete History Order", null);
          })
          .catch((err) => {
            formatResult(res, 500, false, err, null);
          });
      } else {
        formatResult(res, 400, false, "Transaction Not Found", null);
      }
    })
    .catch(() => {
      formatResult(res, 500, false, "Internal Server Error", null);
    });
};
