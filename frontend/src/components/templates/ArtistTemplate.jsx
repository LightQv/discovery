import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getArrList } from "../../services/utils";

export default function ArtistTemplate({ item, index }) {
  return (
    <li className="relative flex h-fit cursor-pointer flex-row items-center justify-between py-1 transition-all hover:bg-stone-200 active:bg-stone-200 dark:hover:bg-neutral-900 dark:active:bg-neutral-900">
      <div className="flex h-full w-full flex-row items-center px-8">
        <Link to={`/artist/${item.id}`}>
          <img
            src={item.images[1]?.url}
            alt="cover"
            className="h-16 w-16 rounded-lg object-cover shadow-lg lg:h-20 lg:w-20"
          />
        </Link>
        <div className="items-left ml-2 flex w-[calc(100%-4.5rem)] flex-col justify-between lg:w-[calc(100%-5.5rem)]">
          <h3 className="line-clamp-1 text-sm font-bold text-purple-500 dark:text-cyan-500">
            {item.name}
          </h3>
          <h4 className="line-clamp-2 text-xs font-light italic">{`${getArrList(
            item.genres
          )}`}</h4>
        </div>
        <h5 className="absolute right-8 top-2 text-xs text-stone-300 dark:text-stone-700">
          {(index + 1).toString().padStart(2, "0")}
        </h5>
      </div>
    </li>
  );
}

ArtistTemplate.propTypes = {
  item: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
