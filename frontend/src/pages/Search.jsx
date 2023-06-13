import axios from "axios";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../contexts/AuthContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { useUserContext } from "../contexts/UserContext";
import RandomTracks from "../components/user_content/RandomTracks";
import AlbumCard from "../components/album/AlbumCard";
import ArtistTemplate from "../components/templates/ArtistTemplate";
import TrackTemplate from "../components/templates/TrackTemplate";

const API_URL = `${import.meta.env.VITE_SPOTIFY_API_URL}`;

export default function Search() {
  const { accessToken } = useAuthContext();
  const user = useUserContext();
  const { darkTheme } = useThemeContext();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const research = searchParams.get("q") || "";
  const [results, setResults] = useState("");
  const [searchType, setSearchType] = useState("track");

  useEffect(() => {
    if (user === null) navigate("/");
    if (!accessToken) return;
    if (!research) return;
    axios
      .get(`${API_URL}/search?q=${research}&type=${searchType}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setResults(res.data);
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
  }, [research, searchType]);

  return (
    <main className="page-container items-center">
      <div className="mt-3 flex w-full items-center justify-between px-8 py-4 lg:mt-2">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl font-bold lg:text-5xl">Search</h1>
          <h6 className="text-xs italic">For any content.</h6>
        </div>
        <Link to="/profile">
          <img
            src={`${user?.images[0]?.url}`}
            alt="profile-pic"
            className="h-16 w-16 rounded-xl border-[1px] border-purple-500 shadow-lg dark:border-cyan-500 lg:h-40 lg:w-40"
          />
        </Link>
      </div>
      <div className="flex h-8 w-10/12 flex-row items-center justify-center gap-2 rounded-xl border-2 border-stone-200 bg-stone-100 dark:border-stone-800 lg:ml-8 lg:w-4/12 lg:justify-start lg:self-start lg:px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-stone-400"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          placeholder="Search for tracks, albums, artists..."
          value={research}
          onChange={(e) => setSearchParams({ q: e.target.value })}
          className="w-3/4 bg-stone-100 text-sm italic text-purple-500 dark:text-cyan-500 lg:w-11/12"
        />
      </div>
      <div className="flew-row flex w-10/12 items-center justify-between gap-2 lg:ml-8 lg:justify-start lg:self-start">
        <button
          onClick={() => setSearchType("album")}
          type="button"
          className={
            searchType === "album"
              ? "mt-4 h-8 w-fit rounded-lg border-2 border-purple-500 bg-purple-500 px-4 text-xs  text-stone-100 transition-all dark:border-cyan-500 dark:bg-cyan-500"
              : "mt-4 h-8 w-fit rounded-lg border-2 border-purple-500 px-4 text-xs text-purple-500 transition-all hover:border-purple-300 hover:text-purple-300 dark:border-cyan-500 dark:text-cyan-500 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
          }
        >
          Albums
        </button>
        <button
          onClick={() => setSearchType("artist")}
          type="button"
          className={
            searchType === "artist"
              ? "mt-4 h-8 w-fit rounded-lg border-2 border-purple-500 bg-purple-500 px-4 text-xs  text-stone-100 transition-all dark:border-cyan-500 dark:bg-cyan-500"
              : "mt-4 h-8 w-fit rounded-lg border-2 border-purple-500 px-4 text-xs text-purple-500 transition-all hover:border-purple-300 hover:text-purple-300 dark:border-cyan-500 dark:text-cyan-500 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
          }
        >
          Artists
        </button>
        <button
          onClick={() => setSearchType("track")}
          type="button"
          className={
            searchType === "track"
              ? "mt-4 h-8 w-fit rounded-lg border-2 border-purple-500 bg-purple-500 px-4 text-xs  text-stone-100 transition-all dark:border-cyan-500 dark:bg-cyan-500"
              : "mt-4 h-8 w-fit rounded-lg border-2 border-purple-500 px-4 text-xs text-purple-500 transition-all hover:border-purple-300 hover:text-purple-300 dark:border-cyan-500 dark:text-cyan-500 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
          }
        >
          Tracks
        </button>
      </div>
      {research === "" && (
        <div className="mb-8 mt-4 h-fit w-full lg:mb-0">
          <RandomTracks accessToken={accessToken} />
        </div>
      )}
      {results.albums && (
        <ul className="mb-6 mt-4 grid grid-cols-2 gap-4 px-8 lg:mb-0 lg:grid-cols-6">
          {results.albums.items.map((album, index) => (
            <AlbumCard key={album.id} album={album} index={index} />
          ))}
        </ul>
      )}
      {results.artists && (
        <ul className="mb-6 mt-4 grid w-full grid-cols-1 lg:mb-0">
          {results.artists.items.map((artist, index) => (
            <ArtistTemplate key={artist.id} item={artist} index={index} />
          ))}
        </ul>
      )}
      {results.tracks && (
        <ul className="mb-6 mt-4 grid w-full grid-cols-1 lg:mb-0">
          {results.tracks.items.map((track, index) => (
            <TrackTemplate key={track.id} item={track} index={index} />
          ))}
        </ul>
      )}
      <ToastContainer bodyClassName={() => "flex text-sm p-4"} />
    </main>
  );
}
