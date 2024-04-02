const express = require('express');
const { uploadPhoto, getImage, getPreviewImage } = require('../controllers/photoController');

const router = express.Router();


router.get('/', async (req, res) => {
    res.send("API is working fine");
})

router.post("/upload", uploadPhoto);

router.get("/images/:key", getImage);
router.get("/image/preview/:key", getPreviewImage);



module.exports = router;