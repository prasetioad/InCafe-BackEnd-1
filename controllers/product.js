const db = require("../models");
const formatResult = require("../helpers/formatResult");
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
  Product.findAll()
    .then((result) => {
      if (result.length > 0) {
        const dataResult = result.map((item) => {
          item.size = JSON.parse(item.size);
          item.deliveryMethod = JSON.parse(item.deliveryMethod);
          return item;
        });
      }
      formatResult(res, 200, true, "Success Get Product!", result);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};

exports.getDataById = (req, res) => {
  
  console.log(req.params);
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

exports.getDataByCategory = (req, res) => {
  console.log(req.params);
  Product.findAll({
    where:{category:req.params.category}})
    .then((result)=>{
      if (result.length > 0) {
        const dataResult = result.map((item) => {
          item.size = JSON.parse(item.size);
          item.deliveryMethod = JSON.parse(item.deliveryMethod);
          return item;
        })
        console.log('95',dataResult[0].dataValues);
      }
      formatResult(res, 200, true, "Success Get Product!", result[0].dataValues);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
}