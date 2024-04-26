const {db} = require('../config/db');
const {admin } = require('../config/db');


exports.createPlaylist = async (req, res) => {
  const { userId, title, description } = req.body;
  const userPlaylistsRef = db.collection('users').doc(userId).collection('playlists');
  
  try {
    const playlistRef = await userPlaylistsRef.add({
      userId,
      title,
      description,
      songs: []
    });
    res.status(201).send({ playlistId: playlistRef.id, message: 'Playlist created successfully' });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).send('Failed to create playlist');
  }
}

exports.deletePlaylist = async (req, res) => {
  const { userId, playlistId } = req.params;
  const userPlaylistsRef = db.collection('users').doc(userId).collection('playlists');

  await userPlaylistsRef.doc(playlistId).delete();

  res.status(200).send('Playlist deleted successfully');
};

exports.addSongToPlaylist = async (req, res) => {
  const { userId, playlistId, song } = req.body;
  const playlistRef = db.collection('users').doc(userId).collection('playlists').doc(playlistId);

  await playlistRef.update({
    songs: admin.firestore.FieldValue.arrayUnion(song)
  });

  res.status(200).send('Song added to playlist successfully');
};

exports.removeSongFromPlaylist = async (req, res) => {
  const { userId, playlistId, songId } = req.params;

  try {
    const playlistRef = db.collection('users').doc(userId).collection('playlists').doc(playlistId);
    const playlistDoc = await playlistRef.get();

    if (!playlistDoc.exists) {
      return res.status(404).send('Playlist not found');
    }

    
    await playlistRef.update({
      songs: admin.firestore.FieldValue.arrayRemove(songId)
    });

    res.status(200).send('Song removed from playlist successfully');
  } catch (error) {
    console.error('Error removing song from playlist:', error);
    res.status(500).send('Failed to remove song from playlist');
  }
};



