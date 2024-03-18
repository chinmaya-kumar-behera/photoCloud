const express = require('express');
const multer = require('multer');
const path = require("path");
const { uploadPhoto } = require('../controllers/photoController');
const photoRouter = express.Router();

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

photoRouter.post("/", upload.single("image"), uploadPhoto);


module.exports = photoRouter;