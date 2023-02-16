import { SearchResults } from "./SearchResults";
import cx from "classnames";
import {
  getAnimeBySearchTerms,
  closeModal,
} from "../features/add-anime-modal-slice";
import { useEffect } from "react";
import { TfiClose } from "react-icons/tfi";
import { useAppDispatch, useAppSelector } from "../hooks";

export const SearchModal = () => {
  const { open } = useAppSelector((store) => store.addAnimeModal);
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      e.key === "Escape" && open && close();
    });
  }, []);

  return (
    <aside className={cx({ hidden: !open })}>
      <div className="add-anime-modal__container">
        <header className="add-anime-modal__header">
          <h2>Find More Anime</h2>
          <button
            className="icon-button"
            onClick={() => {
              close();
            }}
          >
            <TfiClose />
          </button>
        </header>
        <div className="add-anime-modal__content">
          <form
            className="add-anime-form"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(
                getAnimeBySearchTerms(
                  ((e.target as HTMLFormElement)[0] as HTMLInputElement).value
                )
              );
            }}
          >
            <div className="input-container">
              <label htmlFor="search">Search</label>
              <input
                id="search"
                className="add-anime-form__search-input"
                type="text"
                placeholder="Action, 90s, Racing, etc."
              />
            </div>
            <SearchResults />
          </form>
        </div>
      </div>
      <div
        className="add-anime-modal__overlay"
        onClick={() => {
          close();
        }}
      />
    </aside>
  );
};
