const player = (voiceChannel) => {
  if (voiceChannel.queue.length == 0){
    voiceChannel.playing = false;
    return;
  }
  voiceChannel.playing = true;
  const dispatcher = voiceChannel.voiceConnection.playFile(voiceChannel.queue[0]);
  dispatcher.on('end', () => {
    voiceChannel.queue.shift();
    return player(voiceChannel);
  });
};

module.exports = player;