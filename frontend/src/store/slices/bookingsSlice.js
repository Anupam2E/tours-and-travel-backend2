import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserBookings, getAllBookings } from '../../api';

const initialState = {
  bookings: [],
  userBookings: [],
  loading: false,
  error: null,
  totalRevenue: 0
};

// Async thunks for backend sync
export const fetchUserBookingsFromBackend = createAsyncThunk(
  'bookings/fetchUserBookingsFromBackend',
  async (token, { rejectWithValue }) => {
    try {
      const data = await getUserBookings(token);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllBookingsFromBackend = createAsyncThunk(
  'bookings/fetchAllBookingsFromBackend',
  async (token, { rejectWithValue }) => {
    try {
      const data = await getAllBookings(token);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
      state.totalRevenue = action.payload
        .filter(booking => booking.paymentStatus === 'paid')
        .reduce((total, booking) => total + booking.totalAmount, 0);
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
      if (action.payload.paymentStatus === 'paid') {
        state.totalRevenue += action.payload.totalAmount;
      }
    },
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
      if (index !== -1) {
        const oldBooking = state.bookings[index];
        state.bookings[index] = action.payload;
        
        // Update revenue if payment status changed
        if (oldBooking.paymentStatus !== action.payload.paymentStatus) {
          if (action.payload.paymentStatus === 'paid') {
            state.totalRevenue += action.payload.totalAmount;
          } else if (oldBooking.paymentStatus === 'paid') {
            state.totalRevenue -= oldBooking.totalAmount;
          }
        }
      }
    },
    setUserBookings: (state, action) => {
      state.userBookings = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookingsFromBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookingsFromBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
        state.error = null;
      })
      .addCase(fetchUserBookingsFromBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllBookingsFromBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookingsFromBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.totalRevenue = action.payload
          .filter(booking => booking.paymentStatus === 'paid')
          .reduce((total, booking) => total + booking.totalAmount, 0);
        state.error = null;
      })
      .addCase(fetchAllBookingsFromBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  setBookings, 
  addBooking, 
  updateBooking, 
  setUserBookings, 
  setLoading, 
  removeBooking,
  clearError
} = bookingsSlice.actions;
export default bookingsSlice.reducer;