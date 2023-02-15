import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./features/watchlist-slice";
import addAnimeModalReducer from "./features/add-anime-modal-slice";

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    addAnimeModal: addAnimeModalReducer
  }
});
