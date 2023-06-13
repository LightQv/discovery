import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function PlaylistCard({ playlist, index }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <li
      className="h-30 flex flex-col items-center justify-between lg:relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Link to={`/playlist/${playlist.id}`}>
          <img
            src={playlist.images[1].url}
            alt="playlist-cover"
            className="rounded-xl shadow-lg"
          />
        </Link>
      </div>
      <div className="w-full self-start pt-2 text-purple-500 dark:text-cyan-500 lg:hidden">
        <h3 className="line-clamp-1 text-sm font-bold">{`${(index + 1)
          .toString()
          .padStart(2, "0")} - ${playlist.name}`}</h3>
      </div>
      <Link to={`/playlist/${playlist.id}`}>
        {isHover && (
          <div className="hidden lg:absolute lg:left-0 lg:top-0 lg:flex lg:h-full lg:w-full lg:items-center lg:justify-center lg:rounded-xl lg:bg-purple-500/80 lg:pt-0 lg:text-stone-100 lg:dark:bg-cyan-500/80 lg:dark:text-stone-100">
            <h3 className="lg:line-clamp-4 lg:p-2 lg:text-center lg:text-base lg:font-bold">
              {playlist.name}
            </h3>
          </div>
        )}
      </Link>
    </li>
  );
}

PlaylistCard.propTypes = {
  playlist: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
