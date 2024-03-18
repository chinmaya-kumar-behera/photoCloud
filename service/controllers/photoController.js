const path = require("path");
const fs = require("fs");
const imageModel = require("../models/imageModel");
const Images = require("../models/imageModel");


const uploadPhoto = async (req, res) => {
  try {
      const { expirationTime } = req.body;
      if (!req.file) {
          res.json({ message: "Image not added" });
      }
      const { filename } = req.file;

      console.log(new Date())

      console.log(Boolean(expirationTime));

      const newPhoto = new Images({
        imageUrl: `${process.env.BASE_PHOTO_URL}/${filename}`,
        imageName: filename,
        expirationTime:
          expirationTime != "NaN"
            ? new Date(Date.now() + Number(expirationTime) * 60000)
            : null,
        duration: expirationTime != "NaN" ? expirationTime : null,
      });

      await newPhoto.save();
      
    res.json({ imageUrl: newPhoto.imageUrl });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ error: "Failed to upload photo" });
  }
};

const deletePhoto = async(req, res) => {
    try {
        const imageId = req.params.id;
        if (!imageId) {
            res.status(404).json
        }
        const photo = await imageModel.findById(id);
        if (!photo) {
          return res.status(404).json({ error: "Photo not found" });
        }

      res.json({ message: "Photo deleted successfully" });
    } catch (error) {
      console.error("Error deleting photo:", error);
      res.status(500).json({ error: "Failed to delete photo" });
    }
};
  
const deletePhotoHandler = async (id) => {
    try {
        const photo = await imageModel.findById(id);
        if (photo.imageName) fs.unlinkSync(`./uploads/${photo.imageName}`);
        return photo.deleteOne();
    } catch (err) {
      return err;
    }
};
module.exports = { uploadPhoto, deletePhoto, deletePhotoHandler };
