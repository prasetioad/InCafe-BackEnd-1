module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transaction", {});

  return Transaction;
};
