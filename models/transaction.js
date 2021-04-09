module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transaction", {
    userId: {
      type: Sequelize.STRING,
    },
    subTotal: {
      type: Sequelize.INTEGER,
    },
    tax: {
      type: Sequelize.INTEGER,
    },
    postageCost: {
      type: Sequelize.INTEGER,
    },
    totalPayment: {
      type: Sequelize.INTEGER,
    },
    paymentMethod: {
      type: Sequelize.ENUM,
      values: ["card", "bank", "cod"],
    },
    statusOrder: {
      type: Sequelize.ENUM,
      values: ["Process", "Done"],
      defaultValue: "Process",
    },
    deliveryMethod: {
      type: Sequelize.STRING,
    },
  });

  return Transaction;
};
