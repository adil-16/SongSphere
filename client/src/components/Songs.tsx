import React from 'react';
import { useParams } from 'react-router-dom';

type SongProps = {
  cover: string; 
  title: string;
  album: string;
  dateAdded: string;
  duration: string;
};

const Song: React.FC<SongProps> = ({ cover, title, album, dateAdded, duration }) => {
    let { id } = useParams<{ id: string }>();
  
    return (
      <div className="grid grid-cols-12 items-center px-2 py-3 hover:bg-gray-700 gap-x-4">
        <div className="col-span-1 text-gray-400">{id}</div>
        <div className="col-span-5 flex items-center">
          <img src={cover} alt={`${title} cover`} className="h-10 w-10 mr-4" />
          <div>
            <p className="text-white">{title}</p>
          </div>
        </div>
        <div className="col-span-3 text-gray-400 text-sm">{album}</div>
        <div className="col-span-2 text-gray-400">{dateAdded}</div>
        <div className="col-span-1 text-right text-white">{duration}</div>
      </div>
    );
  };


  

export default Song;
