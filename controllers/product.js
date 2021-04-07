const db = require("../models");
const formatResult = require("../helpers/formatResult");
const Product = db.product;

exports.create = (req, res) => {
    const{ name, price, description, size, startHour, endHour, stock, deliveryMethod} = req.body
    const data = { name, price, description, size, startHour, endHour, stock, deliveryMethod}
    Product.create(data)
      .then(() => {
        formatResult(res, 201, true, "Product Created!", {data});
      })
      .catch((err) => {
        formatResult(res, 500, false, err, null);
      });
};

exports.getData = (req, res) => {
  Product.findAll()
    .then((result) => {
      formatResult(res, 200, true, "Success Get Product!", result);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};

exports.getDataById =(req, res) =>{
    const productId = req.params.id
    console.log(productId);
    Product.findAll({
        where: {id: productId},
        attributes: ['id', 'name', 'price','description', 'size', 'startHour', 'endHour', 'stock', 'deliveryMethod', 'image']
      })
    .then((result)=>{
        console.log(productId, result);
        formatResult(res, 200, true, "Success Get Product!", result);
    })
    .catch((err) =>{
        formatResult(res, 500, false, err, "Smething Wrong!");
    })
}

exports.deleteData = (req, res) =>{   
    console.log(req.params.id);    
    Product.destroy({
        where: {
            id: req.params.id
          }
    })
    .then((result) =>{
        formatResult(res, 201, true, "Product Deleted!", result);
    })
    .catch((err)=>{
        formatResult(res, 500, false, " Fail Delete Product!", err); 
    })
}

exports.updateData = (req, res) => {
    const productId = req.params.id
    const { name, price, description, size, startHour, endHour, stock, deliveryMethod } = req.body
    const data = { name, price, description, size, startHour, endHour, stock, deliveryMethod }
    console.log('ini adalah params = ', productId,);
    Product.update(data, { where: { id: productId }})
        .then((result) => {
            formatResult(res, 201, true, "Update Success", result);
        })
        .catch((err) => {
            formatResult(res, 500, false, err, null);
        })
}