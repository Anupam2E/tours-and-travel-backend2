const API_BASE_URL = "http://localhost:8080";

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