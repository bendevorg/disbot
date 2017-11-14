const cache = require('memory-cache');
const constants = require('../utils/constants');

let cachedAudioList = cache.put('audios', [], constants.values.AUDIO_LIST_CACHE_TIME_IN_SECONDS);

module.exports = cachedAudioList;