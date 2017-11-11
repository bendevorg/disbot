const validator = require('../utils/validator');
const constants = require('../utils/constants');
const audioList = require('../utils/audioList');

module.exports = (req, res) => {
  let {audioId} = req.params;
  if (!validator.isValidAudioId(audioId))
    return res.status(404).json({
      msg: constants.error.AUDIO_ID_NOT_FOUND
    });
};