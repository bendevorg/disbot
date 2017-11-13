/**
 * Middleware to access restricted APIs
 * @module controllers/middleware
*/

const constants = require('../utils/constants');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../../audios');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + file.suffix);
  },
});
const limits = {
  fileSize: constants.audio.MAX_FILE_SIZE
};
const fileFilter = (req, file, cb) => {
  const fileSuffix = constants.audio.MIMETYPES[file.mimetype];
  if (!fileSuffix)
    return cb(null, false);
  file.suffix = fileSuffix;
  return cb(null, true);
}
const upload = multer({
  storage:storage,
  fileFilter: fileFilter,
  limits: limits
}).single('audio');
const logger = require('../../tools/logger');

/**
 * Check if user`s token is valid
 *
 * @param {string} req.headers.API_KEY - User`s API Key
 * @return {callback} - Calls the API
 * @throws {json} - Throws a message with the error info
*/
module.exports = (req, res) => {
  upload(req, res, err => {
    if (err)
      return res.status(400).json({
        msg: constants.messages.error.INVALID_AUDIO_DATA
      });
    return res.status(200).json({
      msg: constants.messages.info.AUDIO_UPLOADED
    });
  });
};