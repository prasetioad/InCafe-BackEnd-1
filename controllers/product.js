const db = require("../models");
const formatResult = require("../helpers/formatResult");
const getPagination = require("../helpers/getPagination");
const getPagingData = require("../helpers/getPagingData");
const { Op } = require("sequelize");
const Product = db.product;

exports.create = (req, res) => {
  Product.create(req.body)
    .then((result) => {
      formatResult(res, 201, true, "Product Created!", result.dataValues);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};

exports.getData = (req, res) => {
  const { page, size } = req.query;
  if (page && size) {
    if (req.body.category) {
      const category = req.body.category;
      const { limit, offset } = getPagination(page, size);
      Product.findAndCountAll({
        where: { category },
        limit: parseInt(limit),
        offset: parseInt(offset),
      })
        .then((result) => {
          if (result.rows.length > 0) {
            const newResult = getPagingData(result, page, limit);
            formatResult(res, 200, true, "Success Pagination By Category", newResult);
          } else {
            formatResult(res, 404, false, "Product Not Found", null);
          }
        })
        .catch((err) => {
          formatResult(res, 500, false, err, null);
        });
    } else {
      const { limit, offset } = getPagination(page, size);
      Product.findAndCountAll({ limit: parseInt(limit), offset: parseInt(offset) })
        .then((result) => {
          if (result.rows.length > 0) {
            const newResult = getPagingData(result, page, limit);
            formatResult(res, 200, true, "Success Get Product!", newResult);
          } else {
            formatResult(res, 404, false, "Product Not Found", null);
          }
        })
        .catch((err) => {
          formatResult(res, 500, false, err, null);
        });
    }
  } else {
    if (req.query.name) {
      const name = req.query.name;
      Product.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
      })
        .then((result) => {
          if (result.length > 0) {
            const dataResult = result.map((item) => {
              item.size = JSON.parse(item.size);
              item.deliveryMethod = JSON.parse(item.deliveryMethod);
              return item;
            });
            formatResult(res, 200, true, "Success Search Product!", result);
          } else {
            formatResult(res, 404, false, "Product Not Found", null);
          }
        })
        .catch((err) => {
          console.log(err);
          formatResult(res, 404, false, "productId Not Found", null);
        });
    } else {
      Product.findAll()
        .then((result) => {
          if (result.length > 0) {
            const dataResult = result.map((item) => {
              item.size = JSON.parse(item.size);
              item.deliveryMethod = JSON.parse(item.deliveryMethod);
              return item;
            });
            formatResult(res, 200, true, "Success Get Product!", dataResult);
          } else {
            formatResult(res, 404, false, "Product Not Found", null);
          }
        })
        .catch((err) => {
          formatResult(res, 500, false, err, null);
        });
    }
  }
};

exports.getDataById = (req, res) => {
  const id = req.params.id;
  Product.findOne({
    where: { id },
    order: ["id"],
  })
    .then((result) => {
      result.size = JSON.parse(result.size);
      result.deliveryMethod = JSON.parse(result.deliveryMethod);
      formatResult(res, 200, true, "Success Get Product!", result);
    })
    .catch(() => {
      formatResult(res, 404, false, "productId Not Found", null);
    });
};

exports.getDataByCategory = (req, res) => {
  const category = req.body.category;
  Product.findAll({ where: { category } })
    .then((result) => {
      if (result.length > 0) {
        const dataResult = result.map((item) => {
          item.size = JSON.parse(item.size);
          item.deliveryMethod = JSON.parse(item.deliveryMethod);
          return item;
        });
        formatResult(res, 200, true, "Success Get By Category", dataResult);
      } else {
        formatResult(res, 404, false, "Product Not Found");
      }
    })
    .catch((err) => {
      formatResult(res, 500, false, "Internal Server Error", null);
    });
};

exports.deleteData = (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      formatResult(res, 201, true, "Product Deleted!", null);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};

exports.updateData = (req, res) => {
  const productId = req.params.id;
  Product.update(req.body, { where: { id: productId } })
    .then((result) => {
      if (result[0] === 1) {
        Product.findOne({ where: { id: productId } }).then((resultNew) => {
          resultNew.deliveryMethod = JSON.parse(resultNew.deliveryMethod);
          resultNew.size = JSON.parse(resultNew.size);
          formatResult(res, 200, true, "Update Success", resultNew);
        });
      } else {
        formatResult(res, 400, false, "Error While Update Product", null);
      }
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};
