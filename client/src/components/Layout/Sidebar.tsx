// src/components/Sidebar.tsx
import React, { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import PlaylistModal from "../PlaylistModal";
import toast from "react-hot-toast";
import { usePlaylistContext } from "../../context/PlaylistContext";
import { FaTrash } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { TfiClose } from "react-icons/tfi";
import { TfiAlignJustify } from "react-icons/tfi";

const auth = getAuth();

type sidebarprops = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<sidebarprops> = ({isLoggedIn, setIsLoggedIn}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playlists, setPlaylists, setCurrentPlaylist } = usePlaylistContext();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const token = sessionStorage.getItem("token");

  const handleCreatePlaylist = (title: string, description: string) => {
    console.log("Creating playlist:", title, description);
    // toast.success("Created Playlist Successfully");
    // location.reload();
  };
  const deletePlaylist = async (playlistId: string) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await axios.delete(
            `http://localhost:4000/api/playlist/delete/${user.uid}/${playlistId}`
          );
          console.log(response);

          if (response.status === 200) {
            toast.success("Playlist deleted successfully");
            setTimeout(() => {
              location.reload();
            }, 1000);
          } else {
            throw new Error("Failed to delete playlist");
          }
        } catch (error) {
          toast.error("Error deleting playlist");
          console.error("Error deleting playlist:", error);
        }
      } else {
        console.log("No user is signed in.");
      }
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      // Clear playlists when user logs out
      setPlaylists([]);
      setCurrentPlaylist(null);
    }
  }, [isLoggedIn, setPlaylists, setCurrentPlaylist]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1060) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(isLoggedIn);

  

  return (
    <div>
      {!isSidebarVisible && window.innerWidth <= 1060 && (
        <button
          className="static z-4 top-4 left-4 inline-flex text-white font-bold p-3 mt-3 ml-1 border-2 rounded-lg border-black"
          onClick={() => setIsSidebarVisible(true)}
        >
          <TfiAlignJustify className="text-black bg-white text-3xl" />
        </button>
      )}
      <div
        className={`bg-gray-800 h-full p-4 transition-all duration-300 z-100 ${
          isSidebarVisible
            ? "fixed inset-y-0 left-0 z-30 w-64 sm:w-1/2 md:w-1/2 xl-w-full lg:w-full z-100 shadow-md"
            : "hidden"
        } ${
          window.innerWidth > 1060 ? "relative" : "lg:w-1/4" 
        }`}
      >
        <div className="bg-gray-800 min-h-screen w-full z-100 p-4 ">
          <div className="mb-4">
            <div className="flex flex-row justify-between items-center  ">
              <p className="text-2xl text-white font-bold mb-6">Playlists</p>
              {window.innerWidth < 1060 && (
                <button onClick={() => setIsSidebarVisible(false)}>
                  <TfiClose className=" text-white text-2xl mb-4" />
                </button>
              )}
            </div>
            
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="flex items-center justify-between my-2 hover:bg-gray-700 pr-3 rounded-lg"
                >
                  <Link
                    to={`/playlists/${playlist.id}`}
                    className={`block text-left text-lg rounded p-2 mb-2 w-full ${
                      location.pathname === `/playlists/${playlist.id}`
                        ? "bg-red-600 text-white"
                        : "text-white"
                    }`}
                    onClick={() => setCurrentPlaylist(playlist)}
                  >
                    {playlist.title}
                  </Link>
                  <FaTrash
                    className="text-white hover:text-red-500 cursor-pointer transition-colors duration-300"
                    onClick={() => {
                      // Assuming a delete function exists
                      deletePlaylist(playlist.id);
                    }}
                    size={20}
                  />
                </div>
              ))
            ) : (
              <p className="text-white text-md">No Playlists</p>
            )}
            <hr className="my-4 border-gray-700" />
            <button
              className="text-white flex flex-row items-center md-text-lg lg-text-lg text-sm font-bold rounded py-2 mb-1 w-full hover:bg-gray-700 "
              onClick={() => {
                if (isLoggedIn) {
                  setIsModalOpen(true);
                } else {
                  toast.error("You must be logged in to create playlists.");
                }
              }}
            >
              <CiSquarePlus className="text-3xl mr-2 text-white" />
              <h1>Create New Playlist</h1>
            </button>
            <PlaylistModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onCreate={handleCreatePlaylist}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
