const { db } = require("../config/db");
const { admin } = require("../config/db");

exports.createPlaylist = async (req, res) => {
  const { userId, title, description } = req.body;
  const userPlaylistsRef = db
    .collection("users")
    .doc(userId)
    .collection("playlists");

  try {
    const playlistRef = await userPlaylistsRef.add({
      userId,
      title,
      description,
      songs: [],
    });
    res
      .status(201)
      .send({
        playlistId: playlistRef.id,
        message: "Playlist created successfully",
      });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).send("Failed to create playlist");
  }
};

exports.deletePlaylist = async (req, res) => {
  const { userId, playlistId } = req.params;
  const userPlaylistsRef = db
    .collection("users")
    .doc(userId)
    .collection("playlists");

  await userPlaylistsRef.doc(playlistId).delete();

  res.status(200).send("Playlist deleted successfully");
};

// exports.addSongToPlaylist = async (req, res) => {
//   try {
//     const { userId, playlistId, songId, imageSrc, musicName, artistName } =
//       req.body;
//     const playlistRef = db
//       .collection("users")
//       .doc(userId)
//       .collection("playlists")
//       .doc(playlistId);
//     const playlistDoc = await playlistRef.get();

//     if (!playlistDoc.exists) {
//       return res.status(404).send("Playlist not found");
//     }

//     const playlistData = playlistDoc.data();
//     const currentSongs = playlistData.songs || [];
//     const song = {
//       songId: songId,
//       imageSrc: imageSrc,
//       musicName: musicName,
//       artistName: artistName,
//     };
//     const updatedSongs = [...currentSongs, song];
//     await playlistRef.update({
//       songs: updatedSongs,
//     });

//     console.log("Playlist songs updated successfully!");
//     return res.status(200).send("Song added to playlist successfully");
//   } catch (error) {
//     console.error("Error adding song to playlist:", error);
//     return res.status(500).send("Internal server error");
//   }
// };

exports.addSongToPlaylist = async (req, res) => {
  try {
    const { userId, playlistId } = req.params;

    
    const { songId, imageSrc, musicName, artistName } = req.body;

    if (!songId || !imageSrc || !musicName || !artistName) {
      return res.status(400).send("Missing required song details");
    }
    const playlistRef = db
      .collection("users")
      .doc(userId)
      .collection("playlists")
      .doc(playlistId);
    const playlistDoc = await playlistRef.get();

    if (!playlistDoc.exists) {
      return res.status(404).send("Playlist not found");
    }

    const playlistData = playlistDoc.data();
    const currentSongs = playlistData.songs || [];
    const song = {
      songId: songId,
      imageSrc: imageSrc,
      musicName: musicName,
      artistName: artistName,
    };
    const updatedSongs = [...currentSongs, song];
    await playlistRef.update({
      songs: updatedSongs,
    });

    console.log("Playlist songs updated successfully!");
    return res.status(200).send("Song added to playlist successfully");
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    return res.status(500).send("Internal server error");
  }
};

exports.removeSongFromPlaylist = async (req, res) => {
  try {
    const { userId, playlistId, songId } = req.params;
    const playlistRef = db
      .collection("users")
      .doc(userId)
      .collection("playlists")
      .doc(playlistId);
    const playlistDoc = await playlistRef.get();

    console.log(userId, playlistId, songId); // Log for debugging

    if (!playlistDoc.exists) {
      return res.status(404).send("Playlist not found");
    }

    const playlistData = playlistDoc.data();
    const currentSongs = playlistData.songs || [];

    console.log(playlistData); // Debug to see what playlist data looks like
    const updatedSongs = currentSongs.filter((song) => song.songId != songId);

    if (currentSongs.length === updatedSongs.length) {
      return res.status(404).send("Song not found in the playlist");
    }

    // Update the document with the new array of songs
    await playlistRef.update({
      songs: updatedSongs,
    });

    console.log("Song removed from playlist successfully!");
    return res.status(200).send("Song removed from playlist successfully");
  } catch (error) {
    console.error("Error removing song from playlist:", error);
    return res.status(500).send("Internal server error");
  }
};

exports.getPlaylist = async (req, res) => {
  const userId = req.params.userId;
  const playlistId = req.params.playlistId;

  try {
    const playlistRef = db
      .collection("users")
      .doc(userId)
      .collection("playlists")
      .doc(playlistId);
    const playlistDoc = await playlistRef.get();

    if (!playlistDoc.exists) {
      res.status(404).send("Playlist not found");
      return;
    }

    const playlistData = playlistDoc.data();
    res.status(200).json(playlistData);
  } catch (error) {
    console.error("Error retrieving playlist data:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAllPlaylists = async (req, res) => {
  const userId = req.params.userId;

  try {
    const playlistRef = db
      .collection("users")
      .doc(userId)
      .collection("playlists");
    const playlistsSnapshot = await playlistRef.get();

    const playlists = [];
    playlistsSnapshot.forEach((doc) => {
      const playlistData = doc.data();
      playlistData.id = doc.id;
      playlists.push(playlistData);
    });

    res.status(200).send(playlists);
  } catch (error) {
    console.error("Error retrieving playlist data:", error);
    res.status(500).send("Internal Server Error");
  }
};

// exports.updatePlaylist = async (req, res) => {
//   try {
//     const { userId, playlistId } = req.params;
//     const { title, description, songs } = req.body;

//     const playlistRef = db
//       .collection("users")
//       .doc(userId)
//       .collection("playlists")
//       .doc(playlistId);

//     const playlistDoc = await playlistRef.get();

//     if (!playlistDoc.exists) {
//       return res.status(404).send("Playlist not found");
//     }

//     await playlistRef.update({
//       title: title || playlistDoc.data().title,
//       description: description || playlistDoc.data().description,
//       songs: songs || playlistDoc.data().songs,
//     });

//     console.log("Playlist updated successfully!");
//     return res.status(200).send("Playlist updated successfully");
//   } catch (error) {
//     console.error("Error updating playlist:", error);
//     return res.status(500).send("Internal server error");
//   }
// };
