import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { MusicInfo } from '../types/musicInfo';

interface MusicContextType {
  musicList: MusicInfo[];
  currentPage: number;
  songsPerPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}


export const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [musicList, setMusicList] = useState<MusicInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(16);

  useEffect(() => {
    const fetchAllSongs = async (artist: any) => {
      try {
        const response = await axios.get(
          `https://api.genius.com/search?q=${artist}&access_token=IopVOXfuiOVx9re-Ml7xonqIcYSkTmBCm1SYXFadMtc7L2jFTflliMvLPv2xrK03`
        );
        return response.data.response.hits;
      } catch (error) {
        console.error("Error fetching song lyrics:", error);
        throw error;
      }
    };

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
        "Dua Lipa",
      ];
      const promises = artists.map(artist => fetchAllSongs(artist));
      const allSongs = await Promise.all(promises);
      const songs = allSongs.flat().map(song => ({
        id: song.result.id,
        imageSrc: song.result.header_image_url,
        musicName: song.result.full_title,
        artistName: song.result.artist_names,
      }));
      return songs;
    };

    api().then(songs => {
      setMusicList(songs);
    }).catch(error => console.error("Failed to fetch songs", error));
  }, []);

  const totalPages = Math.ceil(musicList.length / songsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <MusicContext.Provider
      value={{
        musicList,
        currentPage,
        songsPerPage,
        totalPages,
        handlePrevPage,
        handleNextPage,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};