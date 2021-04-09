const db = require("../models");
const formatResult = require("../helpers/formatResult");
const { decodeToken } = require("../helpers/jwtHelper");
const Trx = db.transaction;
const User = db.user;
const Order = db.ordered;

exports.input = (req, res) => {
  const decode = decodeToken(req);
  req.body.userId = decode.userId;
  req.body.totalPayment =
    parseInt(req.body.subTotal) + parseInt(req.body.tax) + parseInt(req.body.postageCost);
  Trx.create(req.body).then((result) => {
    formatResult(res, 201, true, "Success", result);
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
