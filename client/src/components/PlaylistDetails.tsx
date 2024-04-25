// src/pages/PlaylistDetail.tsx

import React from "react";
import { useParams } from "react-router-dom";
import { Playlist } from "../types/playlist";
import { Navbar } from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Song from "./Songs";
import musicImage from "../assets/music.jpeg";
import musicImage2 from "../assets/music2.jpg";
import Footer from "./Layout/Footer";

const PlaylistDetail: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  if (!id) {
    id = "default-id";
  }

  const playlist: Playlist = {
    id,
    title: `Playlist ${id}`,
    description: "Here is a short description for the playlist",

    songs: [
      {
        id: "1",
        cover: musicImage,
        title: "Song 1",
        album: "Album 1",
        dateAdded: "3 weeks ago",
        duration: "2:22",
      },
      {
        id: "2",
        cover: musicImage2,
        title: "Song 2",
        album: "Album 2",
        dateAdded: "1 weeks ago",
        duration: "1:52",
      },
      {
        id: "3",
        cover: musicImage,
        title: "Song 3",
        album: "Album 3",
        dateAdded: "5 weeks ago",
        duration: "3:15",
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-8 ">
          <h2 className="flex justify-center text-3xl font-bold mb-8">
            {playlist.title}
          </h2>
          <p className="text-2xl font-bold mb-2">Description</p>
          <p className="text-xl mb-6">{playlist.description}</p>
          <p className="text-2xl font-bold mb-2">Songs</p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="grid grid-cols-12 text-white mb-3 px-2 gap-x-4">
              <span className="col-span-1">#</span>
              <span className="col-span-5">Title</span>
              <span className="col-span-3">Album</span>
              <span className="col-span-2">Date Added</span>
              <span className="col-span-1 text-right">Duration</span>
            </div>
            {playlist.songs.map((song) => (
              <Song
                key={song.id}
                cover={song.cover}
                title={song.title}
                album={song.album}
                dateAdded={song.dateAdded}
                duration={song.duration}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PlaylistDetail;
