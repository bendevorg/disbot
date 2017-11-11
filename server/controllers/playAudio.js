const voiceChannels = require('../../disbot');
const player = require('../../player');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const audioList = require('../utils/audioList');

module.exports = (req, res) => {
  let {audioId} = req.params;
  if (!validator.isValidAudioId(audioId))
    return res.status(404).json({
      msg: constants.error.AUDIO_ID_NOT_FOUND
    });
  let audio = {
    type: constants.audio.type.FILE,
    source: audioList[audioId]
  };
  voiceChannels[0].queue.push(audio);
  if (!voiceChannels[0].playing)
    player(voiceChannels[0]);
  return res.status(200).json({
    msg: constants.info.AUDIO_ADDED_QUEUE
  });
};
