const audioList = require('./audioList');

function isValidAudioId(audioId) {
  return Number.isInteger(audioId) && audioList.includes(audioId);
}

module.exports = {
  isValidAudioId: isValidAudioId
};
