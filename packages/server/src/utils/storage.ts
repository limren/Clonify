import multer from "multer";

export const storagePlaylist = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/playlist");
  },
  filename: function (req, file, cb) {
    const splitArray = file.originalname.split(".");
    const fileExt =
      splitArray.length > 0 ? splitArray[splitArray.length - 1] : "png";
    cb(null, file.fieldname + "-" + Date.now() + "." + fileExt);
  },
});

export const storageTrack = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/track");
  },
  filename: function (req, file, cb) {
    const splitArray = file.originalname.split(".");
    const fileExt =
      splitArray.length > 0 ? splitArray[splitArray.length - 1] : "png";
    cb(null, file.fieldname + "-" + Date.now() + "." + fileExt);
  },
});

export const storageAlbum = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/track");
  },
  filename: function (req, file, cb) {
    const splitArray = file.originalname.split(".");
    const fileExt =
      splitArray.length > 0 ? splitArray[splitArray.length - 1] : "png";
    cb(null, file.fieldname + "-" + Date.now() + "." + fileExt);
  },
});
