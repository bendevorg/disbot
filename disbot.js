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

const Discord = require('discord.js');
const client = new Discord.Client();
const player = require('./player');

let voiceChannels = [];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === '/join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel && voiceChannels.indexOf(message.member.voiceChannel.id)) {
      voiceChannels.push(message.member.voiceChannel.id);
      voiceChannels.queue = [];
      voiceChannels.queue.push('./audios/omae_wa_mou.mp3');
      voiceChannels.queue.push('./audios/nani.mp3');
      message.member.voiceChannel.join()
        .then(voiceConnection => { // Connection is an instance of VoiceConnection
          player(voiceConnection, voiceChannels.queue);
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});