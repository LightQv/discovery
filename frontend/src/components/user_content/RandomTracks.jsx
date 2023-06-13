import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { useThemeContext } from "../../contexts/ThemeContext";
import { usePlayingContext } from "../../contexts/PlayingContext";
import TrackTemplate from "../templates/TrackTemplate";
import { getPascalCase, getUri } from "../../services/utils";

const API_URL = `${import.meta.env.VITE_SPOTIFY_API_URL}`;

export default function RandomTracks({ accessToken }) {
  const { darkTheme } = useThemeContext();
  const { chooseTrack } = usePlayingContext();
  const [genres, setGenres] = useState(null);
  const [randomGenre, setRandomGenre] = useState("");
  const [generate, setGenerate] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`${API_URL}/recommendations/available-genre-seeds`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setGenres(res.data.genres);
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

  useEffect(() => {
    if (!genres) return;
    const randomNumber = Math.floor(Math.random() * (genres.length - 1));
    setRandomGenre(genres[randomNumber]);
  }, [genres, generate]);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(
        `${API_URL}/recommendations?seed_genres=${randomGenre}%2Ccountry&min_popularity=50`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        setRecommendations(res.data.tracks);
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
  }, [randomGenre]);

  if (!recommendations) return null;
  return (
    <>
      <div className="mb-2 flex h-8 flex-row items-center justify-between px-8">
        <h5 className="line-clamp-1 text-lg">
          Try <span className="italic">{getPascalCase(randomGenre)}</span> songs
          ?
        </h5>
        <div className="flex items-center">
          <button
            onClick={() => setGenerate(!generate)}
            type="button"
            className="mr-2 h-8 w-fit rounded-lg border-2 border-purple-500 px-4 text-xs text-purple-500 transition-all hover:border-purple-300 hover:text-purple-300 dark:border-cyan-500 dark:text-cyan-500 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
          >
            Generate
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 cursor-pointer text-purple-500 transition-all hover:text-purple-300 dark:text-cyan-500 dark:hover:text-cyan-300"
            onClick={() => chooseTrack(getUri(recommendations))}
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {recommendations && (
        <ul className="grid w-full grid-cols-1">
          {recommendations.map((item, index) => (
            <TrackTemplate
              key={item.track ? item.played_at : item.id}
              item={item}
              index={index}
            />
          ))}
        </ul>
      )}
      <ToastContainer bodyClassName={() => "flex text-sm p-4"} />
    </>
  );
}

RandomTracks.propTypes = {
  accessToken: PropTypes.string.isRequired,
};
