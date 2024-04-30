// src/components/CreatePlaylistModal.tsx

import React, { useState } from "react";
import { usePlaylistContext } from "../context/PlaylistContext";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

const auth = getAuth();

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
  song: () => any;
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  onClose,
  song,
}) => {
  const [showToast, setShowToast] = useState(false);
  const { playlists, setCurrentPlaylist } = usePlaylistContext();
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const handleCreate = () => {
    const data = song;
    console.log(data);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is signed in:", user.uid);

        const promises = selectedPlaylists.map(async (playlistId) => {
          const songData = {
            songId: data.id,
            imageSrc: data.imageSrc,
            musicName: data.musicName,
            artistName: data.artistName,
          };
          try {
            const response = await axios.put(
              `http://localhost:4000/api/playlist/addsong/${user.uid}/${playlistId}`,
              songData
            );
            if (response.status === 200) {
              toast.success("Song added to Playlist successfully");
            } else if (response.status === 409) {
              toast.error("Song already in the playlist");
            } else {
              throw new Error("Unexpected response from the server");
            }
          } catch (error) {
            if (
              axios.isAxiosError(error) &&
              error.response &&
              error.response.status === 409
            ) {
              toast.error("Song already in the playlist");
            } else {
              toast.error("Error adding song to playlist");
              console.error("Error adding song to playlist:", error);
            }
          }
        });

        await Promise.all(promises);
      } else {
        console.log("No user is signed in.");
      }
    });
    // setShowToast(true)
    onClose();
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (!isOpen && !showToast) {
    return null;
  }

  const selectPlaylist = (playlist) => {
    const selection = playlist.id;
    setSelectedPlaylists((prev) => {
      if (prev.includes(selection)) {
        return prev.filter((id) => id !== selection);
      } else {
        return [...prev, selection];
      }
    });
  };

  return (
    <>
      {showToast && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-xl z-50">
          Song Added to Playlist Successfully!
        </div>
      )}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-40">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-2xl mx-4">
            <button
              className="absolute top-0 right-0 text-3xl font-bold text-black rounded-full bg-transparent hover:bg-gray-200 p-2 m-2"
              onClick={onClose}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-black text-center mb-4">
              Playlists
            </h2>
            {playlists.length === 0 ? (
              <p className="text-white text-md">No Playlists</p>
            ) : (
              playlists.map((playlist) => (
                <div
                  key={`${playlist.id}-${selectedPlaylists.includes(
                    playlist.id
                  )}`}
                  className={`flex items-center justify-between my-2 p-2 rounded cursor-pointer
    ${
      selectedPlaylists.includes(playlist.id)
        ? "bg-blue-700 text-white"
        : "hover:bg-blue-500 hover:text-white focus:bg-blue-700 focus:text-white"
    }`}
                  onClick={() => selectPlaylist(playlist)}
                  tabIndex={0}
                >
                  {playlist.title}
                </div>
              ))
            )}
            <div className="flex justify-center">
              <button
                className={`bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-800 hover:text-white ${
                  selectedPlaylists.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleCreate}
                disabled={selectedPlaylists.length === 0}
              >
                Add Song
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePlaylistModal;
