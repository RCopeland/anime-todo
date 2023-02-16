import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Anime } from "./watchlist-slice";

export interface ModalState {
  open: boolean;
  searchResults: Anime[];
}

const initialState = {
  open: false,
  searchResults: []
};

const url = "https://graphql.anilist.co";

const buildQuery = (searchTerms: string) => {
  return `{
  Page(page: 0, perPage: 5) {
    media(type: ANIME, search: "${searchTerms}") {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      bannerImage
      description
      episodes
      averageScore
    }
  }
}
`;
};

const variables = {};

export const getAnimeBySearchTerms = createAsyncThunk(
  "addAnimeModal/getAnimeBySearchTerms",
  (searchTerms: string) => {
    const query = buildQuery(searchTerms);
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
      });
  }
);

// @ts-ignore
const addAnimeModalSlice = createSlice({
  name: "addAnimeModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    }
  },
  extraReducers: {
    // @ts-ignore
    [getAnimeBySearchTerms.pending]: (state) => {
      state.isLoading = true;
    },
    // @ts-ignore
    [getAnimeBySearchTerms.fulfilled]: (state, action) => {
      state.searchResults = action.payload.data?.Page?.media || [];
      state.isLoading = false;
    },
    // @ts-ignore
    [getAnimeBySearchTerms.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});

export const { openModal, closeModal } = addAnimeModalSlice.actions;
export default addAnimeModalSlice.reducer;
