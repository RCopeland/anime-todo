import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Anime } from "./watchlist-slice";

export interface ModalState {
  open: boolean;
  isLoading: boolean;
  searchResults: Anime[];
}

const initialState = {
  open: false,
  isLoading: false,
  searchResults: [],
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

export const getAnimeBySearchTerms: any = createAsyncThunk(
  "addAnimeModal/getAnimeBySearchTerms",
  (searchTerms: string) => {
    const query = buildQuery(searchTerms);
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
      });
  }
);

const addAnimeModalSlice = createSlice({
  name: "addAnimeModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
  extraReducers: {
    [getAnimeBySearchTerms.pending]: (state: ModalState) => {
      state.isLoading = true;
    },
    [getAnimeBySearchTerms.fulfilled]: (
      state: ModalState,
      { payload }: { payload: any }
    ) => {
      state.searchResults = payload.data?.Page?.media || [];
      state.isLoading = false;
    },
    [getAnimeBySearchTerms.rejected]: (state: ModalState) => {
      state.isLoading = false;
    },
  },
});

export const { openModal, closeModal } = addAnimeModalSlice.actions;
export default addAnimeModalSlice.reducer;
