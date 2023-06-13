import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { useThemeContext } from "../../contexts/ThemeContext";
import ArtistTemplate from "../templates/ArtistTemplate";

const API_URL = `${import.meta.env.VITE_SPOTIFY_API_URL}`;

export default function TopArtists({ accessToken }) {
  const { darkTheme } = useThemeContext();
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`${API_URL}/me/top/artists?limit=10&offset=0`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setTopArtists(res.data.items);
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

  if (!topArtists) return null;
  return (
    <>
      <div className="mb-2 flex h-8 flex-row items-center justify-start px-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6  text-purple-500 dark:text-cyan-500"
        >
          <path
            fillRule="evenodd"
            d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 00-5.45 5.174.75.75 0 01-1.199.19L9 12.31l-6.22 6.22a.75.75 0 11-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l3.606 3.605a12.694 12.694 0 015.68-4.973l1.086-.484-4.251-1.631a.75.75 0 01-.432-.97z"
            clipRule="evenodd"
          />
        </svg>
        <h5 className="pl-2 text-lg">My Top 10 Artists</h5>
      </div>
      {topArtists.length !== 0 ? (
        <ul className="grid w-full grid-cols-1">
          {topArtists.map((item, index) => (
            <ArtistTemplate key={item.id} item={item} index={index} />
          ))}
        </ul>
      ) : (
        <p className="px-8 text-center text-sm font-normal italic">
          No Top Artists founded.
        </p>
      )}
      <ToastContainer bodyClassName={() => "flex text-sm p-4"} />
    </>
  );
}

TopArtists.propTypes = {
  accessToken: PropTypes.string.isRequired,
};
