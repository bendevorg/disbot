const database = require('../models/database');
const constants = require('../utils/constants');
const logger = require('../../tools/logger');

module.exports = (req, res) => {
  
  database.audio.findAll({
    attributes: ['id', 'name', 'path']
  })
    .then(audioList => {
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
