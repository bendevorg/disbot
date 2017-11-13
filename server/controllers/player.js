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
  let dispatcher;
  switch(audio.type){
    case constants.audio.type.FILE:
      dispatcher = voiceChannel.voiceConnection.playFile(audio.source);
      break;
    case constants.audio.type.STREAM:
      dispatcher = voiceChannel.voiceConnection.playStream(audio.source);
      break;
  }
  dispatcher.on('end', () => {
    voiceChannel.queue.shift();
    return player(voiceChannel);
  });
  dispatcher.on('error', (err) => {
    logger.error(err);
    voiceChannel.queue.shift();
    return player(voiceChannel);
  });
};

module.exports = player;