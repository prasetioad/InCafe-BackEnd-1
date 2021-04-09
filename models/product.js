module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      name: {
        type: Sequelize.STRING(64),
      },
      price: {
          type: Sequelize.STRING(11)
      },
      promoCode: {
          type: Sequelize.STRING(8)
      },
      description:{
          type: Sequelize.STRING(225)
      },
      size: {
          type: Sequelize.JSON,
      },
      startHour: {
          type: Sequelize.INTEGER(2),
      },
      endHour: {
          type: Sequelize.INTEGER(2)
      },
      stock: {
          type: Sequelize.INTEGER(11)
      },
      deliveryMethod: {
          type: Sequelize.JSON,
      },
      image: {
        type: Sequelize.STRING,
        },
    });
  
    return Product;
  };
  