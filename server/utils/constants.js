module.exports = {
  messages: {
    error: {
      AUDIO_ID_NOT_FOUND: 'This audio id was not found in our database.',
      INVALID_URL: 'The url sent is invalid',
      INVALID_API_KEY: 'This is not a valid API key.',
      INVALID_USER_DATA: 'This is not a valid user data.',
      INVALID_AUDIO_DATA: `The audio submited is invalid. 
      The file must be an audio file with no more than 5mb.`,
      UNEXPECTED: 'An unexpected error occurred, please try again.'
    },
    info: {
      AUDIO_ADDED_QUEUE: 'Your audio was added to the bot queue.',
      AUDIO_UPLOADED: 'Your audio was added to our list.'
    }
  },
  regex: {
    URL: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i
  },
  audio: {
    type: {
      FILE: 0,
      STREAM: 1
    },
    MIMETYPES: {
      'audio/mpeg': '.mp3',
      'audio/ogg': '.ogg',
      'audio/wav': '.wav'
    },
    MAX_FILE_SIZE: 5000000
  },
  values: {
    MAX_STRING_SIZE: 255
  },
  paths: {
    AUDIOS_FOLDER: '/../../audios' 
  }
};
