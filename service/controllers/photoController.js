const path = require("path");
const fs = require("fs");
const imageModel = require("../models/imageModel");
const Images = require("../models/imageModel");
const { uploadFile } = require("../FileUploader/fileUploader");


// const uploadPhoto = async (req, res) => {
//   console.log("UploadPhoto called");
//   try {
//     const { expirationTime } = req.body;
//     if (!req.file) {
//       res.json({ message: "Image not added" });
//     }

//     // console.log(req.files)

    // const newPhoto = new Images({
    //   imageUrl: `${process.env.BASE_PHOTO_URL}/${filename}`,
    //   imageName: filename,
    //   expirationTime:
    //     expirationTime != "NaN"
    //       ? new Date(Date.now() + Number(expirationTime) * 60000)
    //       : null,
    //   duration: expirationTime != "NaN" ? expirationTime : null,
    // });
    // await newPhoto.save();

//     // res.json({ imageUrl: newPhoto.imageUrl });
//     res.json({message:"File revceived"});
//   } catch (error) {
//     console.error("Error uploading photo:", error);
//     res.status(500).json({ error: "Failed to upload photo" });
//   }
// };

const uploadPhoto = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files were uploaded." });
  }
  console.log(req.files);

  const { expirationTime } = req.body;

  if (!req.files) {
    return res.satus(404).json({ message: "No photo Found" });
  }

  const fileDetails = await uploadFile(req.files[0]);
  console.log(fileDetails);



  const newPhoto = new Images({
    expirationTime:
      expirationTime != "NaN"
        ? new Date(Date.now() + Number(expirationTime) * 60000)
        : null,
    duration: expirationTime != "NaN" ? expirationTime : null,
    ...fileDetails,
  });
  await newPhoto.save();

  const image = `${process.env.BASE_URL}/images/${newPhoto.key}`;
  const previewImage = `${process.env.BASE_URL}/image/preview/${newPhoto.key}`;
  return res.status(200).send({ image, previewImage });
};

const getImage = async (req, res) => {
  try {
    const { key } = req.params;
    console.log(key)
    if (!key)
      return res
        .status(400)
        .send({ status: false, message: "please input key" });

    const files = await imageModel.findOne({ key: key });
    if (!files)
      return res.status(404).send({ status: false, message: "file not found" });

    let data = files.path.split("/");
    const fileName = data[data.length - 1];

    res
      .status(200)
      .sendFile(
        `${process.env.RESOURCE_PATH}/${data[0]}/${data[1]}/${fileName}`
      );
  } catch (err) {
    if (!err.fileFound) {
      res.status(404).send({ message: "No file Found!" });
    }
    res.status(500).send(err.message);
  }
};

const getPreviewImage = async (req, res) => {
  console.log('get preview image callled');
  try {
    const { key } = req.params;
    if (!key)
      return res
        .status(400)
        .send({ status: false, message: "please input key" });

    const files = await imageModel.findOne({ key: key });
    if (!files)
      return res.status(404).send({ status: false, message: "file not found" });

    let data = files.path.split("/");
    const fileName = data[data.length - 1];

    res
      .status(200)
      .sendFile(
        `${process.env.RESOURCE_PATH}/${data[0]}/${data[1]}/preview/${fileName}`
      );
  } catch (err) {
    if (!err.fileFound) {
      res.status(404).send({ message: "No file Found!" });
    }
    res.status(500).send(err.message);
  }
};

const deletePhoto = async(req, res) => {
    try {
        const imageId = req.params.id;
        if (!imageId) {
            res.status(404).json("not found")
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
      const files = await imageModel.findOne({ key: id });
          if (!files)
            return res
              .status(404)
              .send({ status: false, message: "file not found" });

          let data = files.path.split("/");
          const fileName = data[data.length - 1];

      if (files) {
        fs.unlinkSync(`${process.env.RESOURCE_PATH}/${data[0]}/${data[1]}/${fileName}`);
        fs.unlinkSync(`${process.env.RESOURCE_PATH}/${data[0]}/${data[1]}/preview/${fileName}`);
        console.log("photo deleted")
      }
        return imageModel.deleteOne();
    } catch (err) {
      return err;
    }
};

module.exports = {
  uploadPhoto,
  deletePhoto,
  deletePhotoHandler,
  getPreviewImage,
  getImage
};
