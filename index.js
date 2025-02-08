const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const conectarDB = require("./config/config");
const taskRoutes = require("./routes/tasks");

dotenv.config();
conectarDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
