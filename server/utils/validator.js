const audioList = require('./audioList');

function isValidAudioId(audioId) {
  return Number.isInteger(parseInt(audioId)) && audioList[audioId];
}

module.exports = {
  isValidAudioId: isValidAudioId
};
