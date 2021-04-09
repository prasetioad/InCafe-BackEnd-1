module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define("feedback", {
        userId: {
            type: Sequelize.STRING,
          },
          content: {
              type: Sequelize.STRING(225)
          },
          rating:{
              type: Sequelize.STRING(225)
          },
    });
    
    return Feedback;
  };
  