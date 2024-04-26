const express = require('express');
const { createPlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist } = require('../controllers/playlistController');

const router = express.Router();

router.post('/create', createPlaylist);
router.delete('/delete/:userId/:playlistId', deletePlaylist);
router.post('/addsong', addSongToPlaylist);
router.delete('/removesong/:userId/:playlistId/:songId', removeSongFromPlaylist);

module.exports = router;
