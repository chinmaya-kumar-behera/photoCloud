const { deletePhotoHandler } = require("./controllers/photoController");
const imageModel = require("./models/imageModel");

const deletePhotoAuto = () => {
  let minutes = 0;
  setInterval(async () => {
    try {
      console.log("minute", minutes);
      const expiredPhotos = await imageModel.find({
        expirationTime: { $lt: new Date() },
        // expirationTime: { $ne: null },
      });

        //   console.log(expiredPhotos);
        expiredPhotos.forEach((ep) => console.log(ep.expirationTime > new Date()));

      expiredPhotos.forEach(async (ep) => {
        result = await deletePhotoHandler(ep._id);
        console.log("result", result);
      });

      minutes++;
    } catch (error) {
      console.error("Error deleting expired photos:", error);
    }
  }, 6000);
};

module.exports = { deletePhotoAuto };
