module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING(64),
    },
    price: {
      type: Sequelize.STRING(11),
    },
    description: {
      type: Sequelize.STRING(225),
    },
    size: {
      type: Sequelize.JSON,
    },
    startHour: {
      type: Sequelize.INTEGER(2),
    },
    endHour: {
      type: Sequelize.INTEGER(2),
    },
    stock: {
      type: Sequelize.INTEGER(11),
    },
    deliveryMethod: {
      type: Sequelize.JSON,
    },
    category: {
      type: Sequelize.STRING(50),
    },
    image: {
      type: Sequelize.STRING,
      defaultValue:
        "https://b.zmtcdn.com/data/pictures/6/18770136/84622e4c2839a9807431940c629d1c3e.jpg",
    },
  });

  return Product;
};