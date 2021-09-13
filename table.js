const Sequelize = require("sequelize");
const sequelize = new Sequelize("datab", "root", "archana@alen6", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
}); //Sequalize constructor function

const tables = sequelize.define("companyms", {
  DATE_OF_REGISTRATION: {
    type: Sequelize.DataTypes.STRING,
  },
  AUTHORIZED_CAP: {
    type: Sequelize.DataTypes.BIGINT,
  },
  PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN: {
    type: Sequelize.DataTypes.STRING,
  },
});

module.exports = { tables, sequelize };
