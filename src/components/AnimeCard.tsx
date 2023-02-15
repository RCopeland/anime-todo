import cx from "classnames";
import { useDispatch } from "react-redux";
import { Anime, removeItem } from "../features/watchlist-slice";
import { FiTrash2 } from "react-icons/fi";

export const AnimeCard = ({
  animeData,
  index,
  small
}: {
  animeData: Anime;
  index: number;
  small?: boolean;
}) => {
  const dispatch = useDispatch();
  return (
    <section className={cx("anime-card", { "anime-card--small": small })}>
      <span className="anime-card__number">
        <span className="hash">#</span>
        {index}
      </span>{" "}
      <figure>
        {animeData.bannerImage && (
          <img src={animeData.bannerImage} alt={animeData.title.english} />
        )}
      </figure>
      <figcaption>
        <h2>{animeData.title.english || animeData.title.native}</h2>
        <p
          className="anime-card__description"
          dangerouslySetInnerHTML={{ __html: animeData.description }}
        />
        <footer className="anime-card__footer">
          <div className="anime-card__action-buttons">
            <button
              className="button button--removed"
              onClick={() => {
                dispatch(removeItem(animeData.id));
              }}
            >
              <FiTrash2 /> Remove
            </button>
          </div>
        </footer>
      </figcaption>
    </section>
  );
};
