// PlaylistProvider
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { Playlist } from "../types/playlist";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

interface PlaylistContextType {
  currentPlaylist: Playlist | null;
  playlists: Playlist[];
  setCurrentPlaylist: (playlist: Playlist | null) => void;
  setPlaylists: (playlists: Playlist[]) => void;
}

const PlaylistContext = createContext<PlaylistContextType>({
  currentPlaylist: null,
  playlists: [],
  setCurrentPlaylist: () => {},
  setPlaylists: () => {},
});

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const response = await axios.get(`http://localhost:4000/api/playlist/all-user-playlists/${user.uid}`);
        if (response.status === 200) {
          setPlaylists(response.data);
        } else {
          console.error("Failed to fetch playlists:", response.statusText);
        }
      } else {
        // Clear playlists when there is no user logged in
        setPlaylists([]);
        setCurrentPlaylist(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <PlaylistContext.Provider value={{ currentPlaylist, playlists, setCurrentPlaylist, setPlaylists }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylistContext = () => useContext(PlaylistContext);
