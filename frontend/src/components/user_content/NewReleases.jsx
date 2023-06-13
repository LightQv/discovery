import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { useThemeContext } from "../../contexts/ThemeContext";
import AlbumCard from "../album/AlbumCard";

const API_URL = `${import.meta.env.VITE_SPOTIFY_API_URL}`;

export default function NewReleases({ accessToken }) {
  const { darkTheme } = useThemeContext();
  const [newReleases, setNewReleases] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`${API_URL}/browse/new-releases?limit=24`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setNewReleases(res.data.albums.items);
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

  if (!newReleases) return null;
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
          <h5 className="pl-2 text-lg">Latest Releases</h5>
        </div>
      </div>
      {newReleases.length !== 0 ? (
        <ul className="grid grid-cols-2 gap-4 px-8 lg:grid-cols-6">
          {newReleases.map((album, index) => (
            <AlbumCard key={album.id} album={album} index={index} />
          ))}
        </ul>
      ) : (
        <p className="px-8 text-center text-sm font-normal italic">
          No recent release founded.
        </p>
      )}
      <ToastContainer bodyClassName={() => "flex text-sm p-4"} />
    </>
  );
}

NewReleases.propTypes = {
  accessToken: PropTypes.string.isRequired,
};
