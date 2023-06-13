import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import PropTypes from "prop-types";
import { useThemeContext } from "../../contexts/ThemeContext";
import AlbumCard from "../album/AlbumCard";

const API_URL = `${import.meta.env.VITE_SPOTIFY_API_URL}`;

export default function ArtistAlbums({ accessToken, id, artist }) {
  const { darkTheme } = useThemeContext();
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`${API_URL}/artists/${id}/albums`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setAlbums(res.data.items);
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
  }, [id]);

  return (
    <>
      <div className="justify-left mb-2 flex h-8 flex-row items-center px-8">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6  text-purple-500 dark:text-cyan-500"
          >
            <path
              fillRule="evenodd"
              d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
              clipRule="evenodd"
            />
          </svg>
          <h5 className="pl-2 text-lg">Albums</h5>
        </div>
      </div>
      {albums && (
        <ul className="grid grid-cols-2 gap-4 px-8 lg:grid-cols-6">
          {albums.map((album, index) => (
            <AlbumCard
              key={album.id}
              data={artist}
              album={album}
              index={index}
            />
          ))}
        </ul>
      )}
      <ToastContainer bodyClassName={() => "flex text-sm p-4"} />
    </>
  );
}

ArtistAlbums.propTypes = {
  accessToken: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  artist: PropTypes.shape().isRequired,
};
