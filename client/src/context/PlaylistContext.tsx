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

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setToken(token);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const response = await axios.get(
            `http://localhost:4000/api/playlist/all-user-playlists/${user.uid}`
          );
          if (response.status === 200) {
            setPlaylists(response.data);
          } else {
            console.error("Failed to fetch playlists:", response.statusText);
          }
        }
      });
    }
  }, []);

  return (
    <PlaylistContext.Provider
      value={{ currentPlaylist, playlists, setCurrentPlaylist, setPlaylists }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylistContext = () => useContext(PlaylistContext);
