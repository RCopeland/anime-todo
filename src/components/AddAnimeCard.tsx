import { useDispatch } from "react-redux";
import { openModal } from "../features/add-anime-modal-slice";
import { FiPlusSquare } from "react-icons/fi";

export const AddAnimeCard = () => {
  const dispatch = useDispatch();
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
