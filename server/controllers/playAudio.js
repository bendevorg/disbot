const database = require('../models/database');
const cache = require('memory-cache');
const voiceChannels = require('../../disbot');
const player = require('./player');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const logger = require('../../tools/logger');

module.exports = (req, res) => {
  let {audioId} = req.params;
  if (!validator.isValidAudioId(audioId))
    return res.status(404).json({
      msg: constants.messages.error.AUDIO_ID_NOT_FOUND
    });
  const cachedAudioList = cache.get(constants.values.AUDIO_LIST_CACHE_NAME);
  if (cachedAudioList){
    if (cachedAudioList[audioId]){
      sendAudioToPlayer(cachedAudioList[audioId].path);
      return res.status(200).json({
        msg: constants.messages.info.AUDIO_ADDED_QUEUE
      });
    }
  }
  database.audio.findById(audioId)
    .then(audioFile => {
      if (!audioFile)
        return res.status(404).json({
          msg: constants.messages.error.AUDIO_ID_NOT_FOUND
        });
      sendAudioToPlayer(audioFile.path);
      return res.status(200).json({
        msg: constants.messages.info.AUDIO_ADDED_QUEUE
      });
    })
    .catch(err => {
      logger.critical(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED
      });
    });
};

function sendAudioToPlayer(path) {
  let audio = {
    type: constants.audio.type.FILE,
    source: path
  };
  voiceChannels[0].queue.push(audio);
  if (!voiceChannels[0].playing)
    player(voiceChannels[0]);
}