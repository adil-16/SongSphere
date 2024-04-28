// src/pages/Home.tsx

import React, { useContext, useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import { Navbar } from "../components/Layout/Navbar";
import Card from "../components/Card";
import Footer from "../components/Layout/Footer";
import { MusicContext } from "../context/MusicContext";
import CreatePlaylistModal from "../components/PlaylistAddModal";

const Home: React.FC = () => {
  const musicContext = useContext(MusicContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

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

  const onAddToPlaylist = (song: any) => {
    setModalOpen(true);
    setSelectedSong(song);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleCreatePlaylist = (title: string, description: string) => {
    console.log("Creating playlist:", title, description);
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-5/6 flex flex-col w-full">
          <div className="flex-1">
            <div className="flex  w-full">
              <div className="flex-1 p-2 ml-12 mt-8">
                <div className="flex flex-row flex-wrap gap-4 justify-center">
                  {currentSongs.map((music) => (
                    <Card
                      key={music.id}
                      id={music.id}
                      imageSrc={music.imageSrc}
                      musicName={music.musicName}
                      artistName={music.artistName}
                      onAddToPlaylist={() => onAddToPlaylist(music)}
                    />
                  ))}
                </div>
                <CreatePlaylistModal
                  isOpen={isModalOpen}
                  onClose={handleModalClose}
                  onCreate={handleCreatePlaylist}
                  song={selectedSong}
                />
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
