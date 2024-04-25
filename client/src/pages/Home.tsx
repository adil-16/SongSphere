// src/pages/Home.tsx

import React from 'react';
import Sidebar from '../components/Layout/Sidebar';
import { Navbar } from '../components/Layout/Navbar';
import Card from '../components/Card';
import { MusicInfo } from '../types/musicInfo';
import musicImage from '../assets/music.jpeg';
import musicImage2 from '../assets/music2.jpg';
import Footer from '../components/Layout/Footer';



const musicList: MusicInfo[] = [
  {
    id: 1,
    imageSrc: musicImage,
    musicName: 'Song One',
    artistName: 'Artist One',
  },
  {
    id: 2,
    imageSrc: musicImage2,
    musicName: 'Song Two',
    artistName: 'Artist Two',
  },
  {
    id: 3,
    imageSrc: musicImage,
    musicName: 'Song Three',
    artistName: 'Artist Three',
  },
  {
    id: 4,
    imageSrc: musicImage2,
    musicName: 'Song Three',
    artistName: 'Artist Three',
  },
  {
    id: 5,
    imageSrc: musicImage,
    musicName: 'Song Three',
    artistName: 'Artist Three',
  },
  {
    id: 6,
    imageSrc: musicImage2,
    musicName: 'Song Three',
    artistName: 'Artist Three',
  },
  {
    id: 7,
    imageSrc: musicImage,
    musicName: 'Song Three',
    artistName: 'Artist Three',
  },
];

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-2 ml-12 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {musicList.map((music) => (
              <Card
                key={music.id}
                imageSrc={music.imageSrc}
                musicName={music.musicName}
                artistName={music.artistName}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
