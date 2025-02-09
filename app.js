require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoute");
const User = require("./models/user");

const app = express();
const sequelize = new Sequelize(process.env.DATABASE_URL);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);

sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});