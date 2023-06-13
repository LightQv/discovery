import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { useThemeContext } from "../../contexts/ThemeContext";
import { usePlayingContext } from "../../contexts/PlayingContext";
import TrackTemplate from "../templates/TrackTemplate";
import { getUri } from "../../services/utils";

const API_URL = `${import.meta.env.VITE_SPOTIFY_API_URL}`;

export default function RecentlyPlayed({ accessToken }) {
  const { darkTheme } = useThemeContext();
  const { chooseTrack } = usePlayingContext();
  const [recentSongs, setRecentSongs] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`${API_URL}/me/player/recently-played`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setRecentSongs(res.data.items);
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

  if (!recentSongs) return null;
  return (
    <>
      <div className="mb-2 flex h-8 flex-row items-center justify-between px-8">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6  text-purple-500 dark:text-cyan-500"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
          <h5 className="pl-2 text-lg">Recent Tracks</h5>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 cursor-pointer text-purple-500 transition-all hover:text-purple-300 dark:text-cyan-500 dark:hover:text-cyan-300"
          onClick={() => chooseTrack(getUri(recentSongs))}
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {recentSongs.length !== 0 ? (
        <ul className="grid w-full grid-cols-1">
          {recentSongs.map((item, index) => (
            <TrackTemplate
              key={item.track ? item.played_at : item.id}
              item={item}
              index={index}
            />
          ))}
        </ul>
      ) : (
        <p className="px-8 text-center text-sm font-normal italic">
          No track recently played founded.
        </p>
      )}
      <ToastContainer bodyClassName={() => "flex text-sm p-4"} />
    </>
  );
}

RecentlyPlayed.propTypes = {
  accessToken: PropTypes.string.isRequired,
};
