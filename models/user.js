const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => {
    console.log('Users table has been successfully created, if one doesn\'t exist')
  })
  .catch(error => console.log('This error occured', error));

module.exports = User;