const voiceChannels = require('../../disbot');
const player = require('../player/player');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const ytdl = require('ytdl-core');

module.exports = (req, res) => {
  let {url} = req.query;
  if(!validator.isValidUrl(url))
    return res.status(400).json({
      msg: constants.messages.error.INVALID_URL
    });
  let stream;
  if (ytdl.validateURL(url)) {
    stream = ytdl(url, {filter:'audioonly'});
  }
  else
    stream = url;
  let audio = {
    type: constants.audio.type.STREAM,
    source: stream
  };
  voiceChannels[0].queue.push(audio);
  if (!voiceChannels[0].playing)
    player(voiceChannels[0]);
  res.status(200).json({
    msg: constants.messages.info.AUDIO_ADDED_QUEUE
  });
};