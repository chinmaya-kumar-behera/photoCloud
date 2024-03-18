const express = require('express');
const cors = require('cors');
require("dotenv").config();
const photoRouter = require('./routes/photoRouter');
const { connectToDatabase } = require('./config/dbConfig');

const app = express();
connectToDatabase();

app.use("/uploads", express.static("uploads"));
app.use(cors({ origin: "http://localhost:3000" }));

app.use('/upload', photoRouter);

app.get("/", (req, res) => {
  res.json('ApI i working fine');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
