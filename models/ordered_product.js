module.exports = (sequelize, Sequelize) => {
  const OrderedProduct = sequelize.define("ordered_product", {
    productId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.STRING,
    },
    transactionId: {
      type: Sequelize.INTEGER,
    },
    sizeProduct: {
      type: Sequelize.STRING,
    },
  });

  return OrderedProduct;
};
