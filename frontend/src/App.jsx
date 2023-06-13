import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { UserContextProvider } from "./contexts/UserContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { PlayingContextProvider } from "./contexts/PlayingContext";
import NavBar from "./components/navigation/NavBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Search from "./pages/Search";
import AlbumDetails from "./components/album/AlbumDetails";
import ArtistDetails from "./components/artist/ArtistDetails";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./components/playlist/PlaylistDetails";
import Profile from "./pages/Profile";
import "./App.css";
import Player from "./components/player/Player";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <AuthContextProvider code={code}>
      <UserContextProvider>
        <ThemeContextProvider>
          <PlayingContextProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/library" element={<Library />} />
              <Route path="/search" element={<Search />} />
              <Route path="/album/:id" element={<AlbumDetails />} />
              <Route path="/artist/:id" element={<ArtistDetails />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/playlist/:id" element={<PlaylistDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Player />
          </PlayingContextProvider>
        </ThemeContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
