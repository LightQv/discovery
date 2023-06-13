import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { usePlayingContext } from "../../contexts/PlayingContext";
import { convertTimeTrack } from "../../services/utils";

export default function TrackTemplate({ item, index }) {
  const {
    setPlayingTrackData,
    playingTrack,
    chooseTrack,
    actualTrack,
    isPlaying,
  } = usePlayingContext();

  function handleClick() {
    chooseTrack(item.track ? item.track.uri : item.uri);
    setPlayingTrackData(item.track ? item.track : item);
  }

  return (
    <li className="relative flex h-fit cursor-pointer flex-row items-center justify-between py-1 transition-all hover:bg-stone-200 active:bg-stone-200 dark:hover:bg-neutral-900 dark:active:bg-neutral-900">
      <div className="flex h-full w-full flex-row items-center px-8">
        <Link
          to={`/album/${item.track ? item.track.album.id : item.album.id}`}
          className="relative"
        >
          <img
            src={
              item.track
                ? item.track.album.images[1].url
                : item.album.images[1].url
            }
            alt="cover"
            className="h-16 w-16 rounded-lg object-cover shadow-lg lg:h-20 lg:w-20"
          />
          {playingTrack &&
          isPlaying &&
          (actualTrack === item.track?.uri || actualTrack === item.uri) ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute right-[calc(50%-0.75rem)] top-[calc(50%-0.75rem)] z-10 h-6 w-6 text-stone-100"
              >
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
              </svg>
              <div className="absolute bottom-0 left-0 h-full w-full rounded-lg bg-neutral-900/60" />
            </>
          ) : null}
          {playingTrack &&
          !isPlaying &&
          (actualTrack === item.track?.uri || actualTrack === item.uri) ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute right-[calc(50%-0.75rem)] top-[calc(50%-0.75rem)] z-10 h-6 w-6 text-stone-100"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="absolute bottom-0 left-0 h-full w-full rounded-lg bg-neutral-900/60" />
            </>
          ) : null}
        </Link>
        <button
          type="button"
          className="items-left ml-2 flex w-[calc(100%-4.5rem)] flex-col items-start justify-between text-left lg:w-[calc(100%-5.5rem)]"
          onClick={() => handleClick()}
        >
          <h3
            className={
              playingTrack &&
              (actualTrack === item.track?.uri || actualTrack === item.uri)
                ? "line-clamp-1 text-sm font-bold text-purple-500 dark:text-cyan-500"
                : "line-clamp-1 text-sm font-bold"
            }
          >
            {item.track ? item.track.name : item.name}
          </h3>
          <h4 className="line-clamp-1 text-xs font-light italic">{`${
            item.track ? item.track.album.name : item.album.name
          }`}</h4>
          <h6 className="line-clamp-1 text-xs">{`${
            item.track
              ? item.track.album.artists[0].name
              : item.album.artists[0].name
          }`}</h6>
        </button>
        <h5 className="absolute right-8 top-2 text-xs text-stone-300 dark:text-stone-700">
          {(index + 1).toString().padStart(2, "0")}
        </h5>
        <h5 className="absolute bottom-2 right-8 text-xs text-stone-300 dark:text-stone-700">
          {convertTimeTrack(
            item.track ? item.track.duration_ms : item.duration_ms
          )}
        </h5>
      </div>
    </li>
  );
}

TrackTemplate.propTypes = {
  item: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
