import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { AnimeCard } from "./components/AnimeCard";
import { AddAnimeCard } from "./components/AddAnimeCard";
import { useEffect } from "react";
import { Anime, getDefaultAnime } from "./features/watchlist-slice";
import { SearchModal } from "./components/SearchModal";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDefaultAnime());
  }, [dispatch]);
  const { listItems, isLoading } = useSelector((store) => store.watchlist);

  return (
    <section className="site-container">
      <header className="site-header">
        <a href="#nogo" className="site-header__logo">
          <h1>Anime TODO</h1>
        </a>
      </header>
      <div className="main-layout">
        <div className="main-layout__main">
          <h1 className="hidden">Primary Anime Todo List</h1>
          <ul className="anime-card-list">
            {!isLoading ? (
              listItems.slice(0, 3).map((listItem: Anime, index: number) => (
                <li key={listItem.id}>
                  <AnimeCard animeData={listItem} index={index + 1} />
                </li>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </div>
        <div className="main-layout__secondary">
          <h1 className="hidden">Secondary Anime Todo List</h1>
          <ul className="anime-card-list">
            <li>
              <AddAnimeCard />
            </li>
            {!isLoading ? (
              listItems
                .slice(3, listItems.length)
                .map((listItem: Anime, index: number) => (
                  <li key={listItem.id}>
                    <AnimeCard animeData={listItem} small index={index + 4} />
                  </li>
                ))
            ) : (
              <p>Loading ...</p>
            )}
          </ul>
        </div>
      </div>
      <SearchModal />
    </section>
  );
}
