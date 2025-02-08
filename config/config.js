
const mongoose = require("mongoose");
require("dotenv").config();

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🔥 Base de datos conectada correctamente");
  } catch (error) {
    console.error("🚨 Error al conectar la base de datos:", error);
    process.exit(1);
  }
};

module.exports = conectarDB;
