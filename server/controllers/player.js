const constants = require('../utils/constants');
const logger = require('../../tools/logger');

const player = (voiceChannel) => {
  if (voiceChannel.queue.length == 0){
    voiceChannel.playing = false;
    //voiceChannel.voiceConnection.disconnect();
    return;
  }
  voiceChannel.playing = true;
  const audio = voiceChannel.queue[0];
  switch(audio.type){
    case constants.audio.type.FILE:
      voiceChannel.dispatcher = voiceChannel.voiceConnection.playFile(audio.source);
      break;
    case constants.audio.type.STREAM:
      voiceChannel.dispatcher = voiceChannel.voiceConnection.playStream(audio.source);
      break;
  }
  voiceChannel.dispatcher.on('end', () => {
    voiceChannel.dispatcher = null;
    voiceChannel.queue.shift();
    return player(voiceChannel);
  });
  voiceChannel.dispatcher.on('error', (err) => {
    logger.error(err);
    voiceChannel.dispatcher = null;
    voiceChannel.queue.shift();
    return player(voiceChannel);
  });
};

module.exports = player;