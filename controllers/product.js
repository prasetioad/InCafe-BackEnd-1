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
        if(result.length > 0){
            const dataResult = result.map((item)=>{
                item.size = JSON.parse(item.size)
                item.deliveryMethod = JSON.parse(item.deliveryMethod)
                return item
            })
            console.log(dataResult);
        }
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
    console.log('ini adalah params = ', productId,);
    Product.update(req.body, { where: { id: productId }})
        .then((result) => {
            formatResult(res, 201, true, "Update Success", result);
        })
        .catch((err) => {
            formatResult(res, 500, false, err, null);
        })
}