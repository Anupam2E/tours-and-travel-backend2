import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTours, getTourById } from '../../api';

const initialState = {
  tours: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: ''
};

// Async thunks for backend sync
export const fetchToursFromBackend = createAsyncThunk(
  'tours/fetchFromBackend',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllTours();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTourByIdFromBackend = createAsyncThunk(
  'tours/fetchByIdFromBackend',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getTourById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    setTours: (state, action) => {
      state.tours = action.payload;
    },
    addTour: (state, action) => {
      state.tours.push(action.payload);
    },
    updateTour: (state, action) => {
      const index = state.tours.findIndex(tour => tour.id === action.payload.id);
      if (index !== -1) {
        state.tours[index] = action.payload;
      }
    },
    deleteTour: (state, action) => {
      state.tours = state.tours.filter(tour => tour.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToursFromBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToursFromBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
        state.error = null;
      })
      .addCase(fetchToursFromBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTourByIdFromBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTourByIdFromBackend.fulfilled, (state, action) => {
        state.loading = false;
        // Add the tour to the tours array if it doesn't exist
        const existingIndex = state.tours.findIndex(tour => tour.id === action.payload.id);
        if (existingIndex !== -1) {
          state.tours[existingIndex] = action.payload;
        } else {
          state.tours.push(action.payload);
        }
        state.error = null;
      })
      .addCase(fetchTourByIdFromBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setTours, 
  addTour, 
  updateTour, 
  deleteTour, 
  setLoading, 
  setSearchQuery, 
  setSelectedCategory,
  clearError
} = toursSlice.actions;
export default toursSlice.reducer;