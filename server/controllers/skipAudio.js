const voiceChannels = require('../../disbot');
const constants = require('../utils/constants');
const logger = require('../../tools/logger');

module.exports = (req, res) => {
  if (!voiceChannels[0].playing || !voiceChannels[0].dispatcher)
    return res.status(400).json({
      msg: constants.messages.error.NO_AUDIO_TO_SKIP
    });
  voiceChannels[0].dispatcher.end();
  return res.status(200).json({
    msg: constants.messages.info.AUDIO_SKIPPED
  });
};
