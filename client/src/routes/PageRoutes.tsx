import { Route, Routes } from "react-router-dom";
import Login from "../pages/userProfile/Login";
import Signup from "../pages/userProfile/Signup";
import Home from "../pages/Home";
import PlaylistPage from "../components/PlaylistDetails";

const PagesRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/playlists/:id" element={<PlaylistPage />} />
      </Routes>
    </>
  );
};
export default PagesRoutes;
