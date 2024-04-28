import axios from "axios";

const fetchAllSongs = async (artist: any) => {
    try {
        const response = await axios.get('https://api.genius.com/search', {
            params: {
                q: `${artist}`
            },
            headers: {
                'Authorization': `Bearer umt45Z7Zu8K6-PjUj_vfNnMKW1mFOPorS-fMmzjzlqycH7NtuJcm9kffopRQPUUs`
            }
        });

        return response.data.response.hits
    } catch (error) {
        console.error('Error fetching song lyrics:', error);
        throw error;
    }
}

const api = async () => {
    const artists = [
    "Taylor Swift",
    "Ed Sheeran",
    "Drake",
    "Ariana Grande",
    "Post Malone",
    "Billie Eilish",
    "The Weeknd",
    "Justin Bieber",
    "BTS",
    "Dua Lipa"
  ];
  const allSongs = [];

  for (const artist of artists) {
      const songs = await fetchAllSongs(artist);
      allSongs.push(...songs);
  }

  var songs = []
  for (let i = 0; i < allSongs.length; i++){
    var songObject = {
        id: Number(allSongs[i].result.id),
        imageSrc: String(allSongs[i].result.header_image_url),
        musicName: String(allSongs[i].result.full_title),
        artistName: String(allSongs[i].result.artist_names),
    }
    songs.push(songObject)
  }

  return songs;
}

export default api;