import axios from "axios";

async function fetchAllSongs(artist) {
    try {
        const response = await axios.get('https://api.genius.com/search', {
            params: {
                q: `${artist}`
            },
            headers: {
                'Authorization': `Bearer IopVOXfuiOVx9re-Ml7xonqIcYSkTmBCm1SYXFadMtc7L2jFTflliMvLPv2xrK03`
            }
        });

        return response.data.response.hits
    } catch (error) {
        console.error('Error fetching song lyrics:', error);
        throw error;
    }
}

const main = async () => {
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
        songName: allSongs[i].result.full_title,
        artistName: allSongs[i].result.artist_names,
        songImage: allSongs[i].result.header_image_url,
        songID: allSongs[i].result.id
    }
    songs.push(songObject)
  }

  console.log(songs);
}

main()