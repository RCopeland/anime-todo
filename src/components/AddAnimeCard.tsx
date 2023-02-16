import { openModal } from "../features/add-anime-modal-slice";
import { FiPlusSquare } from "react-icons/fi";
import { useAppDispatch } from "../hooks";

export const AddAnimeCard = () => {
  const dispatch = useAppDispatch();
  return (
    <section className="add-anime-card">
      <p>Search for more anime to add to your ToDo list.</p>
      <button
        className="button add-anime-button"
        onClick={() => {
          dispatch(openModal());
        }}
      >
        <FiPlusSquare />
        Add Anime
      </button>
    </section>
  );
};
