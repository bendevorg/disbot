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
  voiceChannels[0].queue.push(audioList[audioId]);
  console.log(voiceChannels[0].queue);
  player(voiceChannels[0].voiceConnection, voiceChannels[0].queue);
  return res.status(200).json({
    msg: constants.info.AUDIO_ADDED_QUEUE
  });
};
