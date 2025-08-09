import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [
    {
      id: '1',
      userId: 'user1',
      tourId: '1',
      tourTitle: 'Tropical Paradise Adventure',
      tourImage: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
      destination: 'Maldives',
      userEmail: 'john@example.com',
      userName: 'John Doe',
      bookingDate: '2024-01-20',
      travelDate: '2024-03-15',
      endDate: '2024-03-22',
      guests: 2,
      totalAmount: 2598,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      createdAt: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      userId: 'user2',
      tourId: '2',
      tourTitle: 'Mountain Expedition',
      tourImage: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=800',
      destination: 'Swiss Alps',
      userEmail: 'jane@example.com',
      userName: 'Jane Smith',
      bookingDate: '2024-01-18',
      travelDate: '2024-04-10',
      endDate: '2024-04-15',
      guests: 1,
      totalAmount: 899,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'PayPal',
      createdAt: '2024-01-18T14:15:00Z'
    },
    {
      id: '3',
      userId: 'user3',
      tourId: '3',
      tourTitle: 'Cultural Heritage Tour',
      tourImage: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
      destination: 'India',
      userEmail: 'mike@example.com',
      userName: 'Mike Johnson',
      bookingDate: '2024-01-22',
      travelDate: '2024-05-20',
      endDate: '2024-05-26',
      guests: 4,
      totalAmount: 3024,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'Bank Transfer',
      createdAt: '2024-01-22T09:45:00Z'
    }
  ],
  userBookings: [],
  loading: false,
  totalRevenue: 0
};

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
    }
  },
});

export const { 
  setBookings, 
  addBooking, 
  updateBooking, 
  setUserBookings, 
  setLoading, 
  removeBooking 
} = bookingsSlice.actions;
export default bookingsSlice.reducer;