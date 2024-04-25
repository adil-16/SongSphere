// src/components/Sidebar.tsx

import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import PlaylistModal from "../PlaylistModal";
import toast from "react-hot-toast";
import { Playlist } from "../../types/playlist";

type PlaylistProps = {
  id: string;
  title: string;
};

const PlaylistLink: React.FC<PlaylistProps> = ({ id, title }) => {
  const location = useLocation();
  const isActive = location.pathname === `/playlists/${id}`;

  return (
    <Link
      to={`/playlists/${id}`}
      className={`block text-left text-lg rounded p-2 mb-2 w-full ${
        isActive ? 'bg-red-600 text-white' : 'hover:bg-gray-700 text-white'
      }`}
    >
      {title}
    </Link>
  );
};
const Sidebar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const playlists: Playlist[] = [
    { id: '1', title: 'Playlist 1', description: 'Description 1', songs: [] },
    { id: '2', title: 'Playlist 2', description: 'Description 1', songs: [] },
    { id: '3', title: 'Playlist 3', description: 'Description 1', songs: [] },
    { id: '4', title: 'Playlist 4', description: 'Description 1', songs: [] },

  ];

 

  const handleCreatePlaylist = (title: string, description: string) => {
    console.log("Creating playlist:", title, description);
    toast.success("Created Playlist Successfully");
    
  };
  return (
    <div className="bg-gray-800 w-72 p-4 ">
      <div className="mb-4">
        <p className="text-2xl text-white font-bold mb-2">Playlists</p>
        {playlists.map((playlist) => (
          <PlaylistLink key={playlist.id} id={playlist.id} title={playlist.title} />
        ))}
        <hr className="my-4 border-gray-700" />
      </div>
      <button
        className=" text-white inline-flex items-center text-xl font-bold rounded p-2 mb-1 w-full hover:bg-gray-700"
        onClick={() => setIsModalOpen(true)}
      >
        <CiSquarePlus className="text-3xl mr-2 text-white" />
        Create New Playlist
      </button>
      <PlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreatePlaylist}
      />
    </div>
  );
};

export default Sidebar;
