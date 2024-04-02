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
app.use(cors({ origin: "*" }));

const upload = multer();
app.use(upload.any());
  
// app.use("/uploads", express.static("uploads"));
// 
app.use("/", router);

// app.get("/", (req, res) => {
//   res.json({ message: "ApI i working fine" });
// });

deletePhotoAuto();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const photoRouter = require("./routes/photoRouter");
// const { connectToDatabase } = require("./config/dbConfig");
// const { deletePhotoAuto } = require("./cron");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// connectToDatabase();

// app.use(express.json());
// app.use(cors({ origin: "*" }));

// const upload = multer();
// app.use(upload.any());


// app.use("/upload", async (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).json({ error: "No files were uploaded." });
//   }

//   console.log(req.files);
//   console.log("UploadPhoto called");

//   const responseData = { message: "Files uploaded successfully." };
//   console.log('ater response')

//   return res.json(responseData);

// });


// app.get("/", async function testController(req, res) {
//   res.json({ message: "ApI i working fine" });
// });


// ;

// deletePhotoAuto();

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



