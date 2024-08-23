const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.get('/', spotifyController.getLastPlayedSongs);

module.exports = router;
