import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface RootState {
  listItems: Anime[];
  isLoading: boolean;
}

export interface Anime {
  id: string;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  description: string;
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  bannerImage: string;
}

const initialState: RootState = {
  listItems: [],
  isLoading: true
};

const url = "https://graphql.anilist.co";
const query = `
{
 Page(page: 0, perPage: 10) { 
  media (type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      large
    }
    bannerImage
    description
  }
}
}
`;
const variables = {
  id: "15125"
};

export const getDefaultAnime = createAsyncThunk(
  "watchList/getDefaultAnime",
  () => {
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

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    removeItem: (state, { payload }) => {
      state.listItems = state.listItems.filter((item) => item.id !== payload);
    },
    addItem: (state, { payload }) => {
      const animeToAdd: Anime = payload;
      console.log(payload, "payload");
      state.listItems.unshift(animeToAdd);
      state.listItems.pop();
    }
  },
  extraReducers: {
    [getDefaultAnime.pending]: (state) => {
      state.isLoading = true;
    },
    [getDefaultAnime.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listItems = action.payload.data.Page.media;
    },
    [getDefaultAnime.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});

export const { addItem, removeItem } = watchlistSlice.actions;
export default watchlistSlice.reducer;
