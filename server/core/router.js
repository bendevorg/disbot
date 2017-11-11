const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const playAudio = require('../controllers/playAudio');

//  Placeholder API
router.get('/', (req, res) => {
  res.status(200).json({msg: 'Hi!'});
});

router.get('/play/audioId', playAudio);

module.exports = router;