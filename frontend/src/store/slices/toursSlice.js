import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tours: [
    {
      id: '1',
      title: 'Tropical Paradise Adventure',
      description: 'Explore pristine beaches, crystal clear waters, and vibrant coral reefs in this unforgettable tropical getaway.',
      price: 1299,
      duration: 7,
      destination: 'Maldives',
      category: 'Beach',
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
      includes: ['Accommodation', 'Meals', 'Water Sports', 'Airport Transfer'],
      maxGroupSize: 12,
      difficulty: 'easy',
      rating: 4.8,
      reviewCount: 124,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Mountain Expedition',
      description: 'Challenge yourself with breathtaking mountain trails and stunning alpine views in this adventure-packed expedition.',
      price: 899,
      duration: 5,
      destination: 'Swiss Alps',
      category: 'Adventure',
      image: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=800',
      includes: ['Guide', 'Equipment', 'Accommodation', 'Meals'],
      maxGroupSize: 8,
      difficulty: 'difficult',
      rating: 4.9,
      reviewCount: 87,
      isActive: true,
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      title: 'Cultural Heritage Tour',
      description: 'Immerse yourself in rich history and cultural traditions while exploring ancient landmarks and local communities.',
      price: 756,
      duration: 6,
      destination: 'India',
      category: 'Cultural',
      image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=800',
      includes: ['Local Guide', 'Transportation', 'Accommodation', 'Cultural Shows'],
      maxGroupSize: 15,
      difficulty: 'easy',
      rating: 4.7,
      reviewCount: 156,
      isActive: true,
      createdAt: '2024-01-10'
    },
    {
      id: '4',
      title: 'Wildlife Safari Experience',
      description: 'Get up close with magnificent wildlife in their natural habitat during this thrilling safari adventure.',
      price: 1150,
      duration: 8,
      destination: 'Kenya',
      category: 'Wildlife',
      image: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800',
      includes: ['Safari Vehicle', 'Professional Guide', 'Accommodation', 'All Meals'],
      maxGroupSize: 6,
      difficulty: 'moderate',
      rating: 4.9,
      reviewCount: 93,
      isActive: true,
      createdAt: '2024-01-08'
    }
  ],
  loading: false,
  searchQuery: '',
  selectedCategory: ''
};

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
    }
  },
});

export const { 
  setTours, 
  addTour, 
  updateTour, 
  deleteTour, 
  setLoading, 
  setSearchQuery, 
  setSelectedCategory 
} = toursSlice.actions;
export default toursSlice.reducer;