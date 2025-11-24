import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FiltersState {
  genres: string[];
  tags: string[];
}

const initialState: FiltersState = {
  genres: [],
  tags: [],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilter: (
      state,
      action: PayloadAction<{ type: 'genres' | 'tags'; value: string }>
    ) => {
      action.payload.type === 'genres'
        ? state.genres.push(action.payload.value)
        : state.tags.push(action.payload.value);
    },

    removeFilter: (
      state,
      action: PayloadAction<{ type: 'genres' | 'tags'; value: string }>
    ) => {
      if (action.payload.type === 'genres') {
        state.genres = state.genres.filter(
          (item) => item !== action.payload.value
        );
      } else {
        state.tags = state.tags.filter((item) => item !== action.payload.value);
      }
    },

    clearFilter: (state, action: PayloadAction<'genres' | 'tags'>) => {
      state[action.payload] = [];
    },
  },
});

export const { addFilter, removeFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
