import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import { usePlayingContext } from "../../contexts/PlayingContext";
import AlbumTemplate from "../templates/AlbumTemplate";
import GoBack from "../navigation/GoBack";
import Lyrics from "../templates/Lyrics";
import {
  getPascalCase,
  convertDate,
  convertTotalDuration,
  getUri,
  getShuffleUri,
} from "../../services/utils";

const API_URL = `${import.meta.env.VITE_SPOTIFY_API_URL}`;

export default function Album() {
  const { id } = useParams();
  const { accessToken } = useAuthContext();
  const { darkTheme } = useThemeContext();
  const { playingTrack, chooseTrack } = usePlayingContext();

  const [albumData, setAlbumData] = useState(null);
  const [album, setAlbum] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`${API_URL}/albums/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setAlbumData(res.data);
        setAlbum(res.data.tracks.items);
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

  if (!albumData) return null;
  return (
    <main className="flex min-h-screen w-screen flex-row bg-stone-100 pb-12 text-neutral-950 dark:bg-neutral-950 dark:text-stone-100 lg:ml-48 lg:w-[calc(100%-12rem)] lg:pb-4">
      <div
        className={
          show
            ? "flex w-full flex-col transition-all lg:mr-[calc(30%+3.5rem)]"
            : "flex w-full flex-col lg:mr-0"
        }
      >
        <div className="relative mt-3 flex w-full flex-col-reverse items-center justify-between px-8 py-4 lg:mt-2 lg:flex-row-reverse lg:justify-end">
          <div className="flex w-full flex-col items-center lg:items-start lg:pl-4">
            <h3 className="line-clamp-1 pt-2 text-xl font-bold lg:w-full lg:pt-0 lg:text-4xl">
              {getPascalCase(`${albumData.name}`)}
            </h3>
            <h6 className="self-center text-sm lg:self-start lg:text-base">
              {albumData.artists[0].name},{" "}
              {`${convertDate(albumData.release_date)}`}.
            </h6>
            <h6 className="self-center text-xs lg:self-start lg:text-sm">
              {album.length} tracks,{" "}
              <span className="italic">{convertTotalDuration(album)}</span>
            </h6>
          </div>
          <img
            src={`${albumData.images[1].url}`}
            alt="album-pic"
            className="h-40 w-40 rounded-xl shadow-lg lg:h-48 lg:w-48"
          />
          <GoBack />
        </div>
        <div className="mb-4 grid w-full grid-cols-2 gap-2 px-8 lg:flex">
          <button
            type="button"
            onClick={() => chooseTrack(getUri(album))}
            className="flex h-10 w-full items-center justify-center gap-1 rounded-lg bg-purple-500 text-sm text-stone-100 shadow-lg shadow-purple-500/50 transition-all hover:bg-purple-300 dark:bg-cyan-500 dark:shadow-cyan-500/50 dark:hover:bg-cyan-300 lg:w-32"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
            Play
          </button>
          <button
            type="button"
            onClick={() => chooseTrack(getShuffleUri(album))}
            className="flex h-10 w-full items-center justify-center gap-1 rounded-lg bg-purple-500 text-sm text-stone-100 shadow-lg shadow-purple-500/50 transition-all hover:bg-purple-300 dark:bg-cyan-500 dark:shadow-cyan-500/50 dark:hover:bg-cyan-300 lg:w-32"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            Shuffle
          </button>
          {playingTrack !== null && (
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="hidden h-10 w-full items-center justify-center gap-1 rounded-lg border-2 border-purple-500 px-4 text-sm text-purple-500 transition-all hover:border-purple-300 hover:text-purple-300 dark:border-cyan-500 dark:text-cyan-500 dark:hover:border-cyan-300 dark:hover:text-cyan-300 lg:flex lg:w-32"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z"
                  clipRule="evenodd"
                />
              </svg>
              Lyrics
            </button>
          )}
        </div>
        <ul className="grid w-full grid-cols-1">
          {album.map((item, index) => (
            <AlbumTemplate
              key={item.track ? item.track.id : item.id}
              item={item}
              index={index}
              data={albumData}
            />
          ))}
        </ul>
      </div>
      <div
        className={
          show
            ? "fixed right-0 top-0 h-[calc(100vh-5rem)] w-[30%] overflow-auto border-l-[1px] border-stone-200 bg-stone-100 p-8 transition-all duration-200 scrollbar-hide dark:border-neutral-900 dark:bg-neutral-950"
            : "h-0 w-0 bg-stone-100 dark:bg-neutral-950"
        }
      >
        <Lyrics />
      </div>
      <ToastContainer bodyClassName={() => "flex text-sm p-4"} />
    </main>
  );
}
