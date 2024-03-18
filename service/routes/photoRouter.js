const express = require('express');
const multer = require('multer');
const path = require("path");
const photoRouter = express.Router();

console.log(process.env.BASE_PHOTO_URL)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

photoRouter.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imageUrl = `${process.env.BASE_PHOTO_URL}/${req.file.filename}`;
  res.json({ imageUrl });
});


module.exports = photoRouter;