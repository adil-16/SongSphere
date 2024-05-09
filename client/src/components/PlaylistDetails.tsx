// src/pages/PlaylistDetail.tsx
import React, { useState, useEffect } from "react";
import { usePlaylistContext } from "../context/PlaylistContext";
import { useParams } from "react-router-dom";
import { Navbar } from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Song from "./Songs";
import Footer from "./Layout/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const auth = getAuth();
type playlistprops ={
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const PlaylistDetail: React.FC<playlistprops> = ({isLoggedIn, setIsLoggedIn}) => {
  var { currentPlaylist, playlists } = usePlaylistContext();
  const [song, setData] = useState();
  const [uid, setUid] = useState("");
  const [playlistId, setPlaylistid] = useState();

  let { id } = useParams<{ id: string }>();
  useEffect(() => {
    setPlaylistid(id);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is signed in:", user.uid);
        setUid(user.uid);
        //setPlaylistId(id);
        const response = await axios.get(
          `http://localhost:4000/api/playlist/selected-playlist/${user.uid}/${id}`
        );
        console.log(playlists);
        console.log(response.data);
        console.log(currentPlaylist);

        setData(response.data);
        setPlaylistid(id);
      } else {
        console.log("No user is signed in.");
      }
    });
  }, [uid, playlistId, currentPlaylist]);

  if (!id) {
    id = "default-id";
  }

  //
  console.log(playlistId, currentPlaylist);

  if (!song) {
    console.log(currentPlaylist);

    return (
      <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <div className="flex h-screen">
        
        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <div className="flex-1 p-8">
          <p>
            Loading playlist... If no playlist loads, please select a playlist
            from the sidebar.
          </p>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
           <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <div className="flex h-screen">
      <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        <div className="flex-1 p-4 ">
          <h2 className="flex justify-center text-3xl font-bold mb-8">
            {song.title}
          </h2>
          <p className="text-2xl font-bold mb-2">Description</p>
          <p className="text-xl mb-6">{song.description}</p>
          <p className="text-2xl font-bold mb-2">Songs</p>
          <div className="bg-gray-800 p-4 rounded-lg ">
            <div className="grid grid-cols-8 text-white mb-3 px-2 gap-x-2">
              <span className="col-span-1">#</span>
              <span className="col-span-3">Title</span>
              <span className="col-span-2">Artist</span>
              <span className="col-span-1">Delete Song</span>
            </div>
            {song.songs.map((song, index) => {
              console.log(song);

              return (
                <Song
                  uid={uid}
                  playlistid={id}
                  key={song.id}
                  id={song.songId}
                  imageSrc={song.imageSrc}
                  musicName={song.musicName}
                  artistName={song.artistName}
                  songId={index + 1}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default PlaylistDetail;
