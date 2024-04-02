// const mongoose = require("mongoose");


// const imageSchema = mongoose.Schema(
//   {
//     imageUrl: { type: String, required: true },
//     expirationTime: { type: Date, default: null },
//     imageName: String,
//     duration: { type: Number, default: null },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('images',imageSchema)


const mongoose = require("mongoose");
const moment = require("moment-timezone");

const imageSchema = mongoose.Schema(
  {
    url: { type: String },
    path: { type: String, required: true },
    expirationTime: { type: Date, default: null },
    duration: { type: Number, default: null },
    key: { type: String },
    fileType: { type: String },
  },
  { timestamps: true }
);

// imageSchema.pre("save", function (next) {
//   if (this.expirationTime && this.isModified("expirationTime")) {
//     this.expirationTime = moment(this.expirationTime)
//       .tz("Asia/Kolkata")
//       .toDate();
//   }
//   next();
// });
// imageSchema.pre("save", function (next) {
//   if (this.expirationTime && this.isModified("expirationTime")) {
//     console.log("Expiration time before conversion:", this.expirationTime);
//     this.expirationTime = moment(this.expirationTime)
//       .tz("Asia/Kolkata")
//       .toDate();
//     console.log("Expiration time after conversion:", this.expirationTime);
//   }
//   next();
// });

module.exports = mongoose.model("images", imageSchema);
