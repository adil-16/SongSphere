// src/pages/Home.tsx

import React, { useContext } from "react";
import Sidebar from "../components/Layout/Sidebar";
import { Navbar } from "../components/Layout/Navbar";
import Card from "../components/Card";
import Footer from "../components/Layout/Footer";
import { MusicContext } from "../context/MusicContext";

const Home: React.FC = () => {
  const musicContext = useContext(MusicContext);

  if (!musicContext) {
    return <div>Loading...</div>;
  }

  const {
    musicList,
    currentPage,
    songsPerPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
  } = musicContext;

  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = musicList.slice(indexOfFirstSong, indexOfLastSong);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-2 ml-12 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentSongs.map((music) => (
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
      <div className="flex justify-center my-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-gray-200 rounded"
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Home;
