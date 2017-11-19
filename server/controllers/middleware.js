/**
 * Middleware to access restricted APIs
 * @module controllers/middleware
*/

const decryptApiKey = require('../utils/decryptApiKey');
const cache = require('memory-cache');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const database = require('../models/database');
const logger = require('../../tools/logger');

/**
 * Check if user`s token is valid
 *
 * @param {string} req.headers.API_KEY - User`s API Key
 * @return {callback} - Calls the API
 * @throws {json} - Throws a message with the error info
*/
module.exports = (req, res, next) => {
  const api_key = req.headers['api-key'];
  if (!validator.isValidString(api_key))
    return res.status(401).json({
      msg: constants.messages.error.INVALID_API_KEY 
    });
  let cachedApiKeys = cache.get(constants.values.API_KEYS_CACHE_NAME);
  if (cachedApiKeys && cachedApiKeys.includes(api_key)){
    return next();
  }
  decryptApiKey(api_key)
    .then(userData => {
      database.api_user.findById(userData.id)
        .then(apiUser => {
          if (!apiUser)
            return res.status(401).json({
              msg: constants.messages.error.INVALID_API_KEY 
            });
          if (!cachedApiKeys)
            cachedApiKeys = [];
          cachedApiKeys.push(api_key);
          cache.put(
            constants.values.API_KEYS_CACHE_NAME,
            cachedApiKeys,
            constants.values.AUDIO_LIST_CACHE_TIME_IN_SECONDS
          );
          return next();
        })
        .catch(err => {
          logger.error(err);
          return res.status(500).json({
            msg: constants.messages.error.UNEXPECTED
          });
        })
    })
    .catch(err => {
      if (err instanceof SyntaxError)
        return res.status(401).json({
          msg: constants.messages.error.INVALID_API_KEY 
        });
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED
      });
    });
};