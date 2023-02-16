import { addItem, Anime } from "../features/watchlist-slice";
import { closeModal } from "../features/add-anime-modal-slice";
import { useAppSelector, useAppDispatch } from "../hooks";

export const SearchResults = () => {
  const { searchResults, isLoading } = useAppSelector(
    (store) => store.addAnimeModal
  );
  const dispatch = useAppDispatch();

  return (
    <ul className="search-results">
      {isLoading && <p>Loading ... </p>}
      {!isLoading &&
        searchResults?.map((result: Anime) => {
          const availableTitle =
            result.title.userPreferred ||
            result.title.english ||
            result.title.romaji ||
            result.title.native;
          return (
            <li className="search-results__item" key={result.id}>
              <div className="search-results__preview">
                <img src={result.bannerImage} alt={availableTitle} />
                <h3>{availableTitle}</h3>
              </div>
              <button
                className="button add-anime-button"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addItem(result));
                  dispatch(closeModal());
                }}
              >
                Add
              </button>
            </li>
          );
        })}
    </ul>
  );
};
