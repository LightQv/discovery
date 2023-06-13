import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeContext } from "../../contexts/ThemeContext";
import { usePlayingContext } from "../../contexts/PlayingContext";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export default function Lyrics() {
  const { darkTheme } = useThemeContext();
  const { playingTrackData } = usePlayingContext();
  const [lyrics, setLyrics] = useState(null);

  useEffect(() => {
    if (!playingTrackData) return;
    axios
      .get(`${BACKEND_URL}/lyrics`, {
        params: {
          track: playingTrackData.name,
          artist: playingTrackData.artists[0].name,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
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
  }, [playingTrackData]);

  if (!lyrics) return null;
  return (
    <>
      <h3 className="line-clamp-1 text-purple-500 dark:text-cyan-500">
        {playingTrackData.name}
      </h3>
      <h6 className="line-clamp-1 text-sm">
        {playingTrackData.artists[0].name}
      </h6>
      <p className="overflow-auto whitespace-pre pt-4 text-sm italic">
        {lyrics}
      </p>
      <ToastContainer bodyClassName={() => "flex text-sm p-4"} />
    </>
  );
}
