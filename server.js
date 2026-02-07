require("dotenv").config();
const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api", uploadRoute);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
