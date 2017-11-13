/**
 * Middleware to access restricted APIs
 * @module controllers/middleware
*/

const database = require('../models/database');
const constants = require('../utils/constants');
const validator = require('../utils/validator');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + constants.paths.AUDIOS_FOLDER);
  },
  filename: (req, file, cb) => {
    let {audioName} = req.body;
    file.audioName = audioName.trim();
    audioName = file.audioName + file.suffix;
    file.localDestination = constants.paths.AUDIOS_LOCAL_FOLDER + audioName;
    cb(null, audioName);
  }
});
const limits = {
  fileSize: constants.audio.MAX_FILE_SIZE
};
const fileFilter = (req, file, cb) => {
  const {audioName} = req.body;
  if (!validator.isValidString(audioName))
    return cb(null, false); 
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
    if (err || !req.file)
      return res.status(400).json({
        msg: constants.messages.error.INVALID_AUDIO_DATA
      });
    let addAudio = {
      name: req.file.audioName,
      path: req.file.localDestination
    };
    let newAudio = database.audio.build(addAudio);
    newAudio
      .save()
      .then(createdAudio => {
        return res.status(200).json({
          msg: constants.messages.info.AUDIO_UPLOADED
        });
      })
      .catch(err => {
        logger.error(err);
        return res.status(500).json({
          msg: constants.messages.error.UNEXPECTED
        });
      });
  });
};