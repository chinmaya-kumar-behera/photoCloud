const mongoose = require("mongoose");


const imageSchema = mongoose.Schema({
  imageUrl: { type: String, required: true },
  expirationTime: { type: Date, default: null },
  imageName: String,
});





module.exports = mongoose.model('images',imageSchema)
