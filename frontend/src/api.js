const API_BASE_URL = "http://localhost:8082";

export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Registration failed' };
    }
    throw new Error(errorData.message || 'Registration failed');
  }
  
  return res.json();
};

export const loginUser = async (loginData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Login failed' };
    }
    throw new Error(errorData.message || 'Login failed');
  }
  
  return res.json();
};

export const updateUserProfile = async (profile, token) => {
  const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(profile),
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Update failed' };
    }
    throw new Error(errorData.message || 'Failed to update profile');
  }
  
  return res.json();
};

// Tour API functions
export const getAllTours = async () => {
  const res = await fetch(`${API_BASE_URL}/api/tours`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Failed to fetch tours' };
    }
    throw new Error(errorData.message || 'Failed to fetch tours');
  }
  
  return res.json();
};

export const getTourById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/tours/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Failed to fetch tour' };
    }
    throw new Error(errorData.message || 'Failed to fetch tour');
  }
  
  return res.json();
};

// Tour management (Admin)
export const createTour = async (tourData, token) => {
  const res = await fetch(`${API_BASE_URL}/api/tours`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(tourData),
    credentials: 'include'
  });
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try { errorData = text ? JSON.parse(text) : {}; } catch { errorData = { message: text || 'Failed to create tour' }; }
    throw new Error(errorData.message || 'Failed to create tour');
  }
  return res.json();
};

export const updateTour = async (id, tourData, token) => {
  const res = await fetch(`${API_BASE_URL}/api/tours/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(tourData),
    credentials: 'include'
  });
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try { errorData = text ? JSON.parse(text) : {}; } catch { errorData = { message: text || 'Failed to update tour' }; }
    throw new Error(errorData.message || 'Failed to update tour');
  }
  return res.json();
};

export const deleteTour = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/api/tours/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include'
  });
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try { errorData = text ? JSON.parse(text) : {}; } catch { errorData = { message: text || 'Failed to delete tour' }; }
    throw new Error(errorData.message || 'Failed to delete tour');
  }
  return true;
};

// Wishlist API (current user)
export const getMyWishlist = async (token) => {
  const res = await fetch(`${API_BASE_URL}/api/wishlist/my-wishlist`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include'
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to fetch wishlist');
  }
  return res.json();
};

export const addToWishlistCurrent = async (tourId, token) => {
  const res = await fetch(`${API_BASE_URL}/api/wishlist/add-current?tourId=${tourId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include'
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to add to wishlist');
  }
  return true;
};

export const removeFromWishlistCurrent = async (tourId, token) => {
  const res = await fetch(`${API_BASE_URL}/api/wishlist/remove-current?tourId=${tourId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include'
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to remove from wishlist');
  }
  return true;
};

// Booking API functions
export const createBooking = async (bookingData, token) => {
  const res = await fetch(`${API_BASE_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(bookingData),
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Failed to create booking' };
    }
    throw new Error(errorData.message || 'Failed to create booking');
  }
  
  return res.json();
};

export const getCurrentUserBookings = async (token) => {
  const res = await fetch(`${API_BASE_URL}/api/bookings/my-bookings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Failed to fetch bookings' };
    }
    throw new Error(errorData.message || 'Failed to fetch bookings');
  }
  
  return res.json();
};

export const updateBookingStatus = async (id, status, token) => {
  const res = await fetch(`${API_BASE_URL}/api/bookings/${id}/status?status=${status}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Failed to update booking' };
    }
    throw new Error(errorData.message || 'Failed to update booking');
  }
  
  return res.json();
};

export const deleteBooking = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Failed to delete booking' };
    }
    throw new Error(errorData.message || 'Failed to delete booking');
  }
  
  return res;
};

export const getCurrentUserReviews = async (token) => {
  const res = await fetch(`${API_BASE_URL}/api/reviews/my-reviews`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Failed to fetch reviews' };
    }
    throw new Error(errorData.message || 'Failed to fetch reviews');
  }
  
  return res.json();
};

export const createReview = async (reviewData, token) => {
  const res = await fetch(`${API_BASE_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(reviewData),
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Failed to create review' };
    }
    throw new Error(errorData.message || 'Failed to create review');
  }
  
  return res.json();
};

export const updateReview = async (id, reviewData, token) => {
  const res = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(reviewData),
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Failed to update review' };
    }
    throw new Error(errorData.message || 'Failed to update review');
  }
  
  return res.json();
};

export const deleteReview = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {};
    } catch {
      errorData = { message: text || 'Failed to delete review' };
    }
    throw new Error(errorData.message || 'Failed to delete review');
  }
  
  return res;
};

// Additional booking functions for admin and user
export const getUserBookings = async (token) => {
  return getCurrentUserBookings(token);
};

export const getAllBookings = async (token) => {
  const res = await fetch(`${API_BASE_URL}/api/bookings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: 'include'
  });
  
  if (!res.ok) {
    const text = await res.text();
    let errorData;
    try {
      errorData = text ? JSON.parse(text) : {}; } catch { errorData = { message: text || 'Failed to fetch all bookings' }; }
    throw new Error(errorData.message || 'Failed to fetch all bookings');
  }
  
  return res.json();
};