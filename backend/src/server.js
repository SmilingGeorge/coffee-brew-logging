const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./lib/prisma");
const brewRoutes = require("./routes/brews");

const app = express();

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use("/api/brews", brewRoutes);

app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      message: "Coffee Brew API is running",
      database: "connected",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});