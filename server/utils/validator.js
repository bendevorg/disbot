const audioList = require('./audioList');
const constants = require('./constants');

function isValidAudioId(audioId) {
  return Number.isInteger(parseInt(audioId)) && audioList[audioId];
}

function isValidUrl(url){
  return constants.regex.URL.test(url);
}

module.exports = {
  isValidAudioId: isValidAudioId,
  isValidUrl: isValidUrl
};
