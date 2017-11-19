const database = require('../models/database');
const cache = require('memory-cache');
const constants = require('../utils/constants');
const logger = require('../../tools/logger');

module.exports = (req, res) => {
  const cachedAudioList = cache.get(constants.values.AUDIO_LIST_CACHE_NAME);
  if (cachedAudioList){
    return res.status(200).json({
      msg: cachedAudioList
    });
  }
  database.audio.findAll({
    raw: true,
    attributes: ['id', 'name', 'path']
  })
    .then(audioList => {
      cache.put(
        constants.values.AUDIO_LIST_CACHE_NAME, 
        audioList, 
        constants.values.AUDIO_LIST_CACHE_TIME_IN_SECONDS
      );
      if (!audioList || audioList.length == 0)
        return res.status(404).json({
          msg: constants.messages.error.EMPTY_AUDIO_LIST
        });
      return res.status(200).json({
        msg: audioList
      });
    })
    .catch(err => {
      logger.critical(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED
      });
    });
};
