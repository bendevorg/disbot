const player = (voiceChannel) => {
  if (voiceChannel.queue.length == 0){
    voiceChannel.playing = false;
    //voiceChannel.voiceConnection.disconnect();
    return;
  }
  voiceChannel.playing = true;
  //const dispatcher = voiceChannel.voiceConnection.playFile(voiceChannel.queue[0]);
  const dispatcher = voiceChannel.voiceConnection.playStream(voiceChannel.queue[0]);
  dispatcher.on('end', () => {
    voiceChannel.queue.shift();
    return player(voiceChannel);
  });
};

module.exports = player;