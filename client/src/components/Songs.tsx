import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

type SongProps = {
  uid: string;
  playlistid: string;
  imageSrc: string;
  musicName: string;
  artistName: string;
  songId: number;
  id: string;
};

const Song: React.FC<SongProps> = ({
  uid,
  playlistid,
  imageSrc,
  musicName,
  artistName,
  songId,
  id,
}) => {
  const deleteSong = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/playlist/removesong/${uid}/${playlistid}/${id}`
      );

      if (response.status === 200) {
        toast.success("Song deleted successfully");
        alert("Song deleted successfully");
        location.reload();
      } else {
        throw new Error("Failed to delete song");
      }
    } catch (error) {
      toast.error("Error deleting song");
      console.error("Error deleting song:", error);
    }
  };
  return (
    <div className="grid grid-cols-8 items-center px-2 py-3 hover:bg-gray-700 gap-x-2">
      <div className="col-span-1 text-gray-400">{songId}</div>
      <div className="col-span-3 flex items-center flex-row sm:flex-row md:flex-row lg:flex-row xl:flex-row">
        <img
          src={imageSrc}
          alt={`${musicName} cover`}
          className="h-10 w-10 mr-4"
        />
        <p className="text-white truncate text-md pr-8">{musicName}</p>
      </div>
      <div className="col-span-2 text-gray-400 text-md truncate">
        {artistName}
      </div>
      <div className="col-span-1 flex justify-center">
        <FaTrash
          className="text-red-500 hover:text-white cursor-pointer transition-colors duration-300"
          size={20}
          onClick={deleteSong}
        />
      </div>
    </div>
  );
};

export default Song;
