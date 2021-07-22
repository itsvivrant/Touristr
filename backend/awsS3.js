const AWS = require("aws-sdk");
// name of your bucket here
const NAME_OF_BUCKET = "touristrbucket"

const multer = require("multer");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

//  make sure to set environment variables in production for:
//  AWS_ACCESS_KEY_ID
//  AWS_SECRET_ACCESS_KEY
//  and aws will automatically use those environment variables



// --------------------------- Public UPLOAD ------------------------

const singlePublicFileUpload = async (file) => {
  const {buffer } = await file;

  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString()
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
    ACL: "public-read",
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Location;
};

const multiplePublicFileUpload = async (files) => {
  return await Promise.all(
    files.map((file) => {
      return singlePublicFileUpload(file);
    })
  );
};



// --------------------------- Storage ------------------------

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const singleMulterUpload = (nameOfKey) => (
    multer({ storage: storage }).single(nameOfKey)
)

// const singleMulterUpload = (nameOfKey) => (
//     multer({ dest: "uploads/" }).single(nameOfKey)
// )

const multipleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).array(nameOfKey);

module.exports = {
  s3,
  singlePublicFileUpload,
  multiplePublicFileUpload,
  singleMulterUpload,
  multipleMulterUpload,
};
