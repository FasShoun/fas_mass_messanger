const express = require("express");
const router = express.Router();
const goData = require("./../db/conndb");
const multer = require("multer");
const path = require("path");
// const imgsave = requier('./../db/conndb');

// --storage and random file name
const fileg = path.join(__dirname, "./../../template/uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fileg);
  },
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
      console.log(file);
      cd(null, true);
    } else {
      cd(new Error(" file must be jpg, png or file type php"));
    }
  },
});
// --message
const loginSuccess = "Create account successful plz login!";
const userError = "user is already taken try another name";
const gmailError = "Gmail is already taken Plz login";
// --post mathod
router.post("/create", upload.array("file"), async (req, res) => {
  try {
    const filename = req.files.map((val) => {
      return val.filename;
    });
    const getData = new goData(req.body);
    // await getData.save();

    console.log(getData)
    res.render("create",{createSuccess:loginSuccess})
  } catch (err) {
    if (err instanceof multer.MulterError) {
      console.log(err + "coustom error");
    }
    console.log(err)
    res.send(err)
    // --coustom error handaling
    if(err.keyValue.userName){
        res.render("create",{userError:userError})
    }else if(err.keyValue.gmail){
        res.render("create",{gmailError:gmailError})
    }
  }
});
module.exports = router;
//  module.exports =
