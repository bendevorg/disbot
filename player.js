const player = (voiceConnection, queue) => {
  if (queue.length == 0){
    return;
  }
  const dispatcher = voiceConnection.playFile(queue[0]);
  dispatcher.on('end', () => {
    queue.shift();
    player(voiceConnection, queue);
  });
};

module.exports = player;