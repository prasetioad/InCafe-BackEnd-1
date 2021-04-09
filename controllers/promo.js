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
    console.log(dataResult);
    formatResult(res, 200, true, "Success Get Promo!", result);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};

exports.getDataById =(req, res) =>{
    const PromoId = req.params.id
    console.log(PromoId);
    Promo.findAll({
        where: {id: PromoId},
        attributes: ['id', 'name', 'promoCode','description','size','startDate','expiredDate','deliveryMethod','image','minPrice','discount','maxDiscount']
      })
    .then((result)=>{
      const dataResult = result.map((item)=>{
        item.size = JSON.parse(item.size)
        item.deliveryMethod = JSON.parse(item.deliveryMethod)
        return item
    })
    console.log(dataResult);
    console.log(PromoId, result);
    formatResult(res, 200, true, "Success Get Promo!", result);
    })
    .catch((err) =>{
        formatResult(res, 500, false, err, "Smething Wrong!");
    })
}

exports.getDataByPromoCode =(req, res) =>{
  const PromoId = req.params.promoCode
  console.log(PromoId);
  Promo.findAll({
      where: {promoCode: req.params.promoCode},
      attributes: ['id', 'name', 'promoCode','description','size','startDate','expiredDate','deliveryMethod','image','minPrice','discount','maxDiscount']
    })
  .then((result)=>{
    const dataResult = result.map((item)=>{
      item.size = JSON.parse(item.size)
      item.deliveryMethod = JSON.parse(item.deliveryMethod)
      return item
  })
  console.log(dataResult);
  console.log(PromoId, result);
  formatResult(res, 200, true, "Success Get Promo!", result);
  })
  .catch((err) =>{
      formatResult(res, 500, false, err, "Smething Wrong!");
  })
}

exports.deleteData = (req, res) =>{   
    console.log(req.params);    
    Promo.destroy({
        where: {
            userId: req.params.userId
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
    const movieId = req.params.userId
    Promo.update(req.body, { where: { id: movieId }})
        .then((result) => {
            formatResult(res, 201, true, "Update Success", result);
        })
        .catch((err) => {
            formatResult(res, 500, false, err, null);
        })
}