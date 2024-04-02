const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToDatabase } = require("./config/dbConfig");
const { deletePhotoAuto } = require("./cron");
const multer = require("multer");
const router = require("./routes/router");

const app = express();
connectToDatabase();

app.use(express.json())
app.use(cors({ origin: ["http://localhost:3000"] }));

const upload = multer();
app.use(upload.any());
  
app.use("/", router);

deletePhotoAuto();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});