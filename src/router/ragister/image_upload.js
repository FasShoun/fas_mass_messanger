// const goData = require("./../../db/conndb");

// const imageUpload = async (req, res, next) => {
//   try {
//     const avatorGet = req.file;
//     console.log(avatorGet) 
//     const imgSave = new goData({
//       fileUp: {
//         fileName: req.file.filename,
//         fileType: req.file.mimetype,
//         fileSize: req.file.size,
//         fileDestination: req.file.destination
//       },
//     });
//     console.log("File up loging");
//     await imgSave.save();
//     console.log("File up successfull");
//   } catch (err) {
//     console.log("Multer error " + err);
//   }
//   next();
// };

// module.exports = imageUpload;
