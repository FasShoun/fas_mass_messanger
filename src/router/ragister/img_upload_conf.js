const multer = require("multer");
const path = require("path");
// --storage and random file name
const fileg = path.join(__dirname, "./../../../public/uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, fileg)},
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExt);
  },
});
// --upload image and validate
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cd) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      cd(null, true);
    } else {
    }
  },
});
module.exports = upload;