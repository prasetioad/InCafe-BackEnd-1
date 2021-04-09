module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    userId: {
      type: Sequelize.STRING,
    },
    firstName: {
      type: Sequelize.STRING(64),
      defaultValue: "user",
    },
    lastName: {
      type: Sequelize.STRING(64),
      defaultValue: "cafe",
    },
    displayName: {
      type: Sequelize.STRING(20),
      defaultValue: "Sweetest Customers",
    },
    email: {
      type: Sequelize.STRING(64),
    },
    password: {
      type: Sequelize.STRING(64),
    },
    gender: {
      type: Sequelize.ENUM,
      values: ["male", "female"],
      defaultValue: "male",
    },
    role: {
      type: Sequelize.ENUM,
      values: ["admin", "user"],
      defaultValue: "user",
    },
    address: {
      type: Sequelize.STRING(128),
      defaultValue: "InCafe No.33",
    },
    phone: {
      type: Sequelize.STRING(14),
      defaultValue: "0",
    },
    birthday: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    avatar: {
      type: Sequelize.STRING,
      defaultValue:
        "https://img.freepik.com/free-vector/coffee-love-foam-with-beans-cartoon-icon-illustration_138676-2575.jpg",
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return User;
};
