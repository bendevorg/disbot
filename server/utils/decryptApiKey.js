/**
 * Module to decrypt API Keys
 * @module utils/decryptApiKey
 */
const crypto = require('crypto-js');
const constants = require('./constants');

/**
 * User's api decrypt key
 * @readonly
 * @const {string}
 */
const apiSecretKey = process.env.API_KEY_ENCRYPTATION;

/**
 * Ecrypt an encrypted api key
 * Receive an api key and return the user data of that api key
 *
 * @param {string} apiKey - Users`s api Key
 * @return {object} - Returns all the user`s data inside the api key
 * @throws {object} - Returns -1 that indicates a fail
 * 
 */
module.exports = apiKey => {
  return new Promise((resolve, reject) => {
    try {
      if(!apiKey) return reject(constants.messages.error.INVALID_API_KEY);
      let userDataInBytes = crypto.AES.decrypt(apiKey, apiSecretKey);
      let userData = JSON.parse(userDataInBytes.toString(crypto.enc.Utf8));
      return resolve(userData);
    } catch (err) {
      return reject(err);
    }     
  });   
};