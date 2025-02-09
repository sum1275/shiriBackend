const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const MonthlyData = sequelize.define("MonthlyData", {
  Month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Last_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  This_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => {
    console.log('MonthlyData table has been successfully created, if one doesn\'t exist')
  })
  .catch(error => console.log('This error occurred', error));

module.exports = MonthlyData;
