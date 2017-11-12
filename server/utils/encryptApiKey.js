/**
 * Module to gerenate API Keys
 * @module utils/encryptApiKey
 */
const crypto = require('crypto-js');
const constants = require('./constants');

/**
 * User's api encrypt key
 * @readonly
 * @const {string}
 */
const apiSecretKey = process.env.API_KEY_ENCRYPTATION;

/**
 * Generates a encrypted api key
 * Receive user's information and generate a new api key
 *
 * @param {object} userData - User data
 * @return {string} - Returns a encryptated hash that will be used as the user`s API KEY
 * @throws {object} - Returns err that indicates a fail
 * 
 */
module.exports = userData => {
  return new Promise((resolve, reject) => {
    try {
      if(!userData) return reject(constants.messages.error.INVALID_USER_DATA);
      let apiKey = crypto.AES.encrypt(JSON.stringify(userData), apiSecretKey).toString();
      return resolve(apiKey);  
    } catch (err){
      return reject(err);
    }   
  });
};