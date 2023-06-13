import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { useThemeContext } from "../../contexts/ThemeContext";
import PlaylistCard from "../playlist/PlaylistCard";

const API_URL = `${import.meta.env.VITE_SPOTIFY_API_URL}`;

export default function UserPlaylists({ accessToken, user }) {
  const { darkTheme } = useThemeContext();
  const [playlistData, setPlaylistData] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`${API_URL}/users/${user.id}/playlists`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setPlaylistData(res.data.items);
      })
      .catch(() =>
        toast.error("An error has occured, try later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkTheme ? "dark" : "light",
        })
      );
  }, []);

  if (!playlistData) return null;
  return (
    <>
      {playlistData.length !== 0 ? (
        <ul className="grid grid-cols-2 gap-4 px-8 lg:grid-cols-6">
          {playlistData.map((playlist, index) => (
            <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
          ))}
        </ul>
      ) : (
        <p className="px-8 text-center text-sm font-normal italic">
          No playlist founded.
        </p>
      )}
      <ToastContainer bodyClassName={() => "flex text-sm p-4"} />
    </>
  );
}

UserPlaylists.propTypes = {
  accessToken: PropTypes.string.isRequired,
  user: PropTypes.shape().isRequired,
};
