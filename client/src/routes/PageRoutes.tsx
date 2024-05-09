import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/userProfile/Login";
import Signup from "../pages/userProfile/Signup";
import Home from "../pages/Home";
import PlaylistPage from "../components/PlaylistDetails";

const PagesRoutes = () => {
  const [isloggedIn, setIsloggedIn] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home isLoggedIn= {isloggedIn} setIsLoggedIn={setIsloggedIn}  />} />
        <Route path="/login" element={<Login isLoggedIn={isloggedIn} setIsLoggedIn={setIsloggedIn}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/playlists/:id" element={<PlaylistPage />} />
      </Routes>
    </>
  );
};
export default PagesRoutes;
