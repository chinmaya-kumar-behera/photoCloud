const { deletePhotoHandler } = require("./controllers/photoController");
const imageModel = require("./models/imageModel");

const deletePhotoAuto = () => {
  setInterval(async () => {
    console.log("set interval");

    try {
    //   const expiredPhotos = await imageModel.find({
    //     expirationTime: { $lt: new Date() },
        //   });
        
        const expiredPhotos = await imageModel.find({
          expirationTime: { $lt: new Date() },
          expirationTime: { $ne: null },
        });


      console.log(expiredPhotos);   

      expiredPhotos.forEach(async (ep) => {
        result = await deletePhotoHandler(ep._id);
        console.log("result", result);
      });
    } catch (error) {
      console.error("Error deleting expired photos:", error);
    }
  }, 6000);
};

module.exports = { deletePhotoAuto };
