/**
 * Module to upload new audios
 * @module utils/upload
*/

const constants = require('./constants');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../../audios');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + file.suffix);
  }
});
const fileFilter = (req, file, cb) => {
  const fileSuffix = constants.audio.mimetypes[file.mimetype];
  if (!fileSuffix)
    return cb(null, false);
  file.suffix = fileSuffix;
  return cb(null, true);
}
module.exports = multer({
  storage:storage,
  fileFilter: fileFilter
});