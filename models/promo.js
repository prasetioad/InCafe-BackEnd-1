module.exports = (sequelize, Sequelize) => {
  const Promo = sequelize.define("promo", {
    name: {
      type: Sequelize.STRING(28),
    },
    promoCode: {
      type: Sequelize.STRING(25),
    },
    description: {
      type: Sequelize.STRING(225),
    },
    size: {
      type: Sequelize.JSON,
    },
    startDate: {
      type: Sequelize.STRING(28),
    },
    expiredDate: {
      type: Sequelize.STRING(28),
    },
    deliveryMethod: {
      type: Sequelize.JSON,
    },
    image: {
      type: Sequelize.STRING,
    },
    minPrice: {
      type: Sequelize.INTEGER,
    },
    discount: {
      type: Sequelize.STRING(225),
    },
    maxDiscount: {
      type: Sequelize.INTEGER,
    },
  });

  return Promo;
};
