import React from "react";
import { FiPlus } from "react-icons/fi";

type CardProps = {
  id: number;
  imageSrc: string;
  musicName: string;
  artistName: string;
  onAddToPlaylist: ({ id, imageSrc, musicName, artistName }) => void;
};

const Card: React.FC<CardProps> = ({
  id,
  imageSrc,
  musicName,
  artistName,
  onAddToPlaylist,
}) => {
  const token = sessionStorage.getItem("token");

  return (
    <div className="w-72 rounded overflow-hidden shadow-lg relative">
      <img
        className="w-full h-72 object-cover"
        src={imageSrc}
        alt="Music Cover"
      />
      <button
        className="absolute top-0 right-0 m-2 text-white bg-black hover:bg-red-600 bg-opacity-50 rounded-full p-2"
        onClick={() => {
          if (token) {
            onAddToPlaylist({ id, imageSrc, musicName, artistName });
          } else {
            alert("Sign In first");
          }
        }}
       
        aria-label="Add to playlist"
      >
        <FiPlus size={20} />
      </button>
      <div className="p-4">
        <div className="font-bold text-xl mb-4">{musicName}</div>
        <p className="text-gray-700 text-base">{artistName}</p>
      </div>
    </div>
  );
};

export default Card;
