import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      id: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      role: 'user',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinDate: '2023-06-15',
      lastLogin: '2024-01-25T10:30:00Z',
      isActive: true,
      totalBookings: 3,
      totalSpent: 4250,
      countriesVisited: ['Maldives', 'Thailand', 'Japan'],
      reviewsGiven: 2
    },
    {
      id: 'user2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      role: 'user',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinDate: '2023-08-20',
      lastLogin: '2024-01-24T15:45:00Z',
      isActive: true,
      totalBookings: 2,
      totalSpent: 1950,
      countriesVisited: ['Switzerland', 'Austria'],
      reviewsGiven: 2
    },
    {
      id: 'user3',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike@example.com',
      phone: '+1234567892',
      role: 'user',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinDate: '2023-12-10',
      lastLogin: '2024-01-23T08:20:00Z',
      isActive: true,
      totalBookings: 1,
      totalSpent: 756,
      countriesVisited: ['India'],
      reviewsGiven: 0
    },
    {
      id: 'admin1',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@toursandtravels.com',
      phone: '+1234567893',
      role: 'admin',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinDate: '2023-01-01',
      lastLogin: '2024-01-25T12:00:00Z',
      isActive: true,
      totalBookings: 0,
      totalSpent: 0,
      countriesVisited: [],
      reviewsGiven: 0
    }
  ],
  currentUser: null,
  loading: false,
  totalUsers: 0,
  activeUsers: 0
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.totalUsers = action.payload.filter(user => user.role === 'user').length;
      state.activeUsers = action.payload.filter(user => user.role === 'user' && user.isActive).length;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
      if (action.payload.role === 'user') {
        state.totalUsers += 1;
        if (action.payload.isActive) {
          state.activeUsers += 1;
        }
      }
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        const oldUser = state.users[index];
        state.users[index] = action.payload;
        
        // Update counters if needed
        if (oldUser.role === 'user' && action.payload.role !== 'user') {
          state.totalUsers -= 1;
          if (oldUser.isActive) state.activeUsers -= 1;
        } else if (oldUser.role !== 'user' && action.payload.role === 'user') {
          state.totalUsers += 1;
          if (action.payload.isActive) state.activeUsers += 1;
        } else if (action.payload.role === 'user' && oldUser.isActive !== action.payload.isActive) {
          state.activeUsers += action.payload.isActive ? 1 : -1;
        }
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { 
  setUsers, 
  addUser, 
  updateUser, 
  setCurrentUser, 
  setLoading 
} = usersSlice.actions;
export default usersSlice.reducer;