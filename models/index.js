const dbConfig = require("../configs");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.product = require("./product")(sequelize, Sequelize);
db.feedback = require("./feedback")(sequelize, Sequelize);
db.promo = require("./promo")(sequelize, Sequelize)
db.ordered = require("./ordered_product")(sequelize, Sequelize);
db.transaction = require("./transaction")(sequelize, Sequelize);

module.exports = db;