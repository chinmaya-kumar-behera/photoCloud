const mongoose = require("mongoose");


const photoSchema = mongoose.Schema({
  url: String,
});


export default mongoose.model('photos',photoSchema)
