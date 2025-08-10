import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMyWishlist, addToWishlistCurrent, removeFromWishlistCurrent } from '../../services/api';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks for backend sync
export const fetchWishlistFromBackend = createAsyncThunk(
  'wishlist/fetchFromBackend',
  async (token, { rejectWithValue }) => {
    try {
      const data = await getMyWishlist(token);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToWishlistBackend = createAsyncThunk(
  'wishlist/addToBackend',
  async ({ tourId, token }, { rejectWithValue }) => {
    try {
      await addToWishlistCurrent(tourId, token);
      return tourId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromWishlistBackend = createAsyncThunk(
  'wishlist/removeFromBackend',
  async ({ tourId, token }, { rejectWithValue }) => {
    try {
      await removeFromWishlistCurrent(tourId, token);
      return tourId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    setWishlistItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistFromBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistFromBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchWishlistFromBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlistBackend.fulfilled, (state, action) => {
        // Tour was added to backend, no need to modify local state
        // as it will be fetched from backend
      })
      .addCase(removeFromWishlistBackend.fulfilled, (state, action) => {
        const removedId = action.payload;
        state.items = state.items.filter(item => item.id !== removedId);
      });
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, setWishlistItems } = wishlistSlice.actions;
export default wishlistSlice.reducer;