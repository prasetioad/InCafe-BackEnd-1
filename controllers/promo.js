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
  Promo.findAll()
    .then((result) => {
      const dataResult = result.map((item)=>{
        item.size = JSON.parse(item.size)
        item.deliveryMethod = JSON.parse(item.deliveryMethod)
        return item
    })
    formatResult(res, 200, true, "Success Get Promo!", result);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};

exports.getDataById =(req, res) =>{ 
    const PromoId = req.params.id
    if(PromoId.length > 5){
      Promo.findAll({
        where: {promoCode: PromoId},
        attributes: ['id', 'name', 'price', 'promoCode','description','size','startDate','expiredDate','deliveryMethod','image','minPrice','discount','maxDiscount']
      })
    .then((result)=>{
      const dataResult = result.map((item)=>{
        item.size = JSON.parse(item.size)
        item.deliveryMethod = JSON.parse(item.deliveryMethod)
        return item
    })
    result.length > 0?
    formatResult(res, 200, true, "Success Get Promo!", result) :
    formatResult(res, 200, true, "Success Get Promo!", "Data tidak ada")
    })
    .catch((err) =>{
        formatResult(res, 500, false, err, "Smething Wrong!");
    })
  }else{
    Promo.findAll({
      where: {id: PromoId},
      attributes: ['id', 'name', 'price', 'promoCode','description','size','startDate','expiredDate','deliveryMethod','image','minPrice','discount','maxDiscount']
    })
    .then((result)=>{
      const dataResult = result.map((item)=>{
        item.size = JSON.parse(item.size)
        item.deliveryMethod = JSON.parse(item.deliveryMethod)
        return item
      })
      result.length > 0?
    formatResult(res, 200, true, "Success Get Promo!", result) :
    formatResult(res, 200, true, "Success Get Promo!", "Data tidak ada")
    })
    .catch((err) =>{
      formatResult(res, 500, false, err, "Smething Wrong!");
    })
  }
}
exports.deleteData = (req, res) =>{
    Promo.destroy({
        where: {
            id: req.params.id
          }
    })
    .then((result) =>{
        formatResult(res, 201, true, "Promo Deleted!", result);
    })
    .catch((err)=>{
        formatResult(res, 500, false, " Fail Delete Promo!", err); 
    })
}

exports.updateData = (req, res) => {
    Promo.update(req.body, { where: { id: req.params.id }})
        .then((result) => {
            formatResult(res, 201, true, "Update Success", result);
        })
        .catch((err) => {
            formatResult(res, 500, false, err, null);
        })
}