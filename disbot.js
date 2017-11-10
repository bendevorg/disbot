'use strict';
/* eslint-disable no-console */
/**const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = require('../server/core/router.js');
const morgan = require('morgan');
const logger = require('./logger');
const app = express();

app.use('/api', router);
app.use(logger.errorHandler());
app.use(morgan('tiny'));

module.exports = app;
**/
const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const player = require('./player');

let voiceChannels = [{
  id: '144890708875018242',
  voiceConnection: null,
  receiver: null,
  queue: [],
  playing: false,
}];

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
  voiceChannels.forEach(voiceChannel => {
    client.channels.get(voiceChannel.id).join()
      .then(voiceConnection => {
        voiceChannel.voiceConnection = voiceConnection;
        voiceChannel.receiver = voiceConnection.createReceiver();
        player(voiceConnection, voiceChannel.queue);
      });
  });
});

client.on('guildMemberSpeaking', (user, speaking) => {
  if (user.speaking){
    let audioStream = voiceChannels[0].receiver.createPCMStream(user);
    let outputStream = generateOutputFile(voiceChannels[0], user);
    audioStream.pipe(outputStream);
    outputStream.on("data", console.log);
    audioStream.on('end', () => {
      console.log('done');
    });
    return;
  }
  console.log('stop speaking');
})

// make a new stream for each time someone starts to talk
function generateOutputFile(channel, member) {
  // use IDs instead of username cause some people have stupid emojis in their name
  const fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;
  return fs.createWriteStream(fileName);
}