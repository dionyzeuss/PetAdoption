require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const portNumber = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB Connection
console.log(process.env.MONGO_URI);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => console.log("connected to MongoDB"));

const petRoute = require("./routes/petRoute");
app.use("/api/v1/pets", petRoute);

const shopRoute = require("./routes/shopRoute");
app.use("/api/v1/items", shopRoute);

const salesRoute = require("./routes/salesRoute");
app.use("/api/v1/sales", salesRoute);


app.listen(portNumber, () => {
  console.log('server is running on http://localhost:${portNumber}');
});
