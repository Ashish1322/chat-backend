// old multer middleware

// const cutomSetting = multer.diskStorage({
//   destination: (req, file, cb) => {
//     return cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.user._id + file.originalname);
//   },
// });

// const upload = multer({ storage: cutomSetting });

// 1. Imporint the packages
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
dotenv.config();

// 2. Connect your aws accocunt
aws.config.update({
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

// 3. intialsise the s3 service from the connected account
const mys3 = new aws.S3();

// 4. Final: Create the middleware that will upload the things
const upload = multer({
  storage: multerS3({
    s3: mys3,
    acl: "public-read",
    bucket: "mentorkart2",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      console.log("inside the middleware", file);
      cb(null, file.originalname);
    },
  }),
});

module.exports = { upload };
