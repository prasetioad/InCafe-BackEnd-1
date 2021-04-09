const db = require("../models");
const formatResult = require("../helpers/formatResult");
const Promo = db.promo;

exports.create = (req, res) => {
  Promo.create(req.body)
    .then((result) => {
      formatResult(res, 201, true, "Promo Created!", result.dataValues);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};

exports.getData = (req, res) => {
  if (req.body.promoId) {
    Promo.findOne({
      where: { id: req.body.promoId },
      attributes: [
        "id",
        "name",
        "promoCode",
        "description",
        "size",
        "startDate",
        "expiredDate",
        "deliveryMethod",
        "image",
        "minPrice",
        "discount",
        "maxDiscount",
      ],
    })
      .then((result) => {
        result.size = JSON.parse(result.size);
        result.deliveryMethod = JSON.parse(result.deliveryMethod);
        formatResult(res, 200, true, "Success Get Promo!", result);
      })
      .catch((err) => {
        formatResult(res, 500, false, err, "Smething Wrong!");
      });
  } else if (req.body.promoCode) {
    Promo.findOne({
      where: { promoCode: req.body.promoCode },
    })
      .then((result) => {
        result.size = JSON.parse(result.size);
        result.deliveryMethod = JSON.parse(result.deliveryMethod);
        formatResult(res, 200, true, "Success Get Promo!", result);
      })
      .catch((err) => {
        formatResult(res, 500, false, err, "Smething Wrong!");
      });
  } else {
    Promo.findAll()
      .then((result) => {
        const dataResult = result.map((item) => {
          item.size = JSON.parse(item.size);
          item.deliveryMethod = JSON.parse(item.deliveryMethod);
          return item;
        });
        formatResult(res, 200, true, "Success Get Promo!", dataResult);
      })
      .catch((err) => {
        formatResult(res, 500, false, err, null);
      });
  }
};

exports.deleteData = (req, res) => {
  const id = req.params.id;
  Promo.destroy({ where: { id } })
    .then((result) => {
      if (result === 1) {
        formatResult(res, 201, true, "Promo Deleted!", null);
      } else {
        formatResult(res, 404, false, "Promo Not Found!", null);
      }
    })
    .catch((err) => {
      formatResult(res, 500, false, " Fail Delete Promo!", err);
    });
};

exports.updateData = (req, res) => {
  const id = req.params.id;
  Promo.update(req.body, { where: { id } })
    .then((result) => {
      if (result[0] === 1) {
        Promo.findOne({ where: { id } }).then((resultNew) => {
          resultNew.size = JSON.parse(resultNew.size);
          resultNew.deliveryMethod = JSON.parse(resultNew.deliveryMethod);
          formatResult(res, 201, true, "Update Success", resultNew);
        });
      } else {
        formatResult(res, 400, false, "Update Failed!", null);
      }
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};
