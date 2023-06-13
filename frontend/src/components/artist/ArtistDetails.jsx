import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import GoBack from "../navigation/GoBack";
import ArtistTopTracks from "./ArtistTopTracks";
import ArtistAlbums from "./ArtistAlbums";
import { getArrList } from "../../services/utils";

const API_URL = `${import.meta.env.VITE_SPOTIFY_API_URL}`;

export default function Artist() {
  const { id } = useParams();
  const { accessToken } = useAuthContext();
  const { darkTheme } = useThemeContext();

  const [artist, setArtist] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`${API_URL}/artists/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setArtist(res.data);
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

  if (!artist) return null;
  return (
    <main className="flex min-h-screen w-screen flex-col bg-stone-100 pb-12 text-black dark:bg-black dark:text-stone-100 lg:ml-48 lg:w-[calc(100%-12rem)] lg:pb-3">
      <div className="relative mt-3 flex w-full flex-col-reverse items-center px-8 py-4 lg:mt-2 lg:flex-row-reverse lg:justify-end">
        <div className="flex w-full flex-col items-center lg:items-start lg:pl-4">
          <h3 className="line-clamp-1 pt-2 text-xl font-bold lg:w-full lg:pt-0 lg:text-4xl">
            {artist.name}
          </h3>
          <h6 className="line-clamp-2 text-center text-xs font-light italic">{`${getArrList(
            artist.genres
          )}`}</h6>
        </div>
        <img
          src={`${artist.images[1].url}`}
          alt="artist-pic"
          className="h-40 w-40 rounded-xl shadow-lg lg:h-48 lg:w-48"
        />
        <GoBack />
      </div>
      <ArtistTopTracks accessToken={accessToken} id={id} />
      <ArtistAlbums accessToken={accessToken} id={id} artist={artist} />
      <ToastContainer bodyClassName={() => "flex text-sm p-4"} />
    </main>
  );
}
