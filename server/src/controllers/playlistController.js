const db = require('../config/db');

exports.createPlaylist = async (req, res) => {
    const { userId, title, description } = req.body;
    const playlistRef = await db.collection('playlists').add({
      title,
      description,
      songs: [],
      userId
    });
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      playlists: admin.firestore.FieldValue.arrayUnion(playlistRef.id)
    });
    res.status(201).send('Playlist created successfully');
};

exports.deletePlaylist = async (req, res) => {
    const { userId, playlistId } = req.body;
    await db.collection('playlists').doc(playlistId).delete();
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      playlists: admin.firestore.FieldValue.arrayRemove(playlistId)
    });
    res.status(200).send('Playlist deleted successfully');
};
