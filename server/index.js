const express = require("express");
const cors = require("cors");
const { connectDB } = require("./database");
const { PORT } = require("./config");

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const stockRoutes = require("./routes/stock");
const productRoutes = require("./routes/products");

app.use("/stockinfo", stockRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("MongoDB is connected using the native driver!");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
