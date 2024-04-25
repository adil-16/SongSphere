const express = require('express');
const { createPlaylist, deletePlaylist } = require('../controllers/playlistController');

const router = express.Router();

router.post('/create', createPlaylist);
router.post('/delete', deletePlaylist);


module.exports = router;
