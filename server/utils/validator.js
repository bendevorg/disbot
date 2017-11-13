const _ = require('underscore');
const audioList = require('./audioList');
const constants = require('./constants');

function isValidAudioId(audioId) {
  return Number.isInteger(parseInt(audioId)) && audioList[audioId];
}

function isValidUrl(url){
  return constants.regex.URL.test(url);
}

/**
 * Validate if the input is a valid not empty string
 *
 * @param {string} stringToValidate - String to be validated
 * @return {boolean} - True case the string is valid and false if it is not
 */
function isValidString(stringToValidate) {
  return _.isString(stringToValidate) 
    && stringToValidate.trim().length > 0
    && stringToValidate.length <= constants.values.MAX_STRING_SIZE;
};

module.exports = {
  isValidAudioId: isValidAudioId,
  isValidUrl: isValidUrl,
  isValidString: isValidString
};
