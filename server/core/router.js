const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const upload = require('../utils/upload');

const middleware = require('../controllers/middleware');
const playAudio = require('../controllers/playAudio');
const playStream = require('../controllers/playStream');
const generateApiKey = require('../controllers/generateApiKey');

//  Placeholder API
router.get('/', (req, res) => {
  res.status(200).json({msg: 'Hi!'});
});

router.get('/play/file/:audioId', middleware, playAudio);
router.get('/play/stream', playStream);
router.post('/upload', upload.single('audio'), (req, res) => {
  return res.status(200).json({
    msg: 'File uploaded'
  });
});

// We won`t let new api keys to be generated for now
//router.post('/create/api_key', generateApiKey);

module.exports = router;
