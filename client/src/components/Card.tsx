// src/components/Card.tsx

import React from 'react';

type CardProps = {
  imageSrc: string;
  musicName: string;
  artistName: string;
};

const Card: React.FC<CardProps> = ({ imageSrc, musicName, artistName }) => {
  return (
    // Set specific width using w-64 or another width class
    <div className="w-72 rounded overflow-hidden shadow-lg">
      {/* Adjust the image height class if needed and maintain object-cover for aspect ratio */}
      <img className="w-full h-72 object-cover" src={imageSrc} alt="Music Cover" />
      <div className="p-4">
        <div className="font-bold text-xl mb-4">{musicName}</div>
        <p className="text-gray-700 text-base">{artistName}</p>
      </div>
    </div>
  );
};

export default Card;
