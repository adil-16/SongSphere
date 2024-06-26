const express = require('express');
const { createPlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist, getPlaylist, getAllPlaylists, updatePlaylist } = require('../controllers/playlistController');

const router = express.Router();

router.post('/create', createPlaylist);
router.delete('/delete/:userId/:playlistId', deletePlaylist);
// router.post('/addsong', addSongToPlaylist);
router.delete('/removesong/:userId/:playlistId/:songId', removeSongFromPlaylist);
router.get('/selected-playlist/:userId/:playlistId', getPlaylist)
router.get('/all-user-playlists/:userId', getAllPlaylists)
router.put('/addsong/:userId/:playlistId', addSongToPlaylist);


module.exports = router;
