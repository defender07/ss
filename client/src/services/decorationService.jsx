import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token'); // Helper function to get token

// Existing GET requests
export const getDecorationTeams = async () => {
  const response = await axios.get(`${API_URL}/decorations`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    },
  });
  console.log("organiser decoration", response.data);
  return response.data;
};

export const getCateringTeams = async () => {
  const response = await axios.get(`${API_URL}/caterings`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    },
  });
  console.log("organiser catering", response.data);
  return response.data;
};

export const getVenueTeams = async () => {
  const response = await axios.get(`${API_URL}/venues`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    },
  });
  console.log("organiser venue", response.data);
  return response.data;
};

// POST requests
export const addDecorationTeam = async (formData) => {
  const response = await axios.post(`${API_URL}/decorations/add`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    },
  });
  return response.data;
};

export const addVenueTeam = async (formData) => {
  const response = await axios.post(`${API_URL}/venues/add`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    },
  });
  return response.data;
};

export const addCateringTeam = async (formData) => {
  const response = await axios.post(`${API_URL}/caterings/add`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    },
  });
  return response.data;
};

// GET requests for user-specific data
export const getDecorationTeams_user = async () => {
  const response = await axios.get(`${API_URL}/decorations/user`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    },
  });
  console.log("getDecorationTeams_user", response.data);
  return response.data;
};

export const getCateringTeams_user = async () => {
  const response = await axios.get(`${API_URL}/caterings/user`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    },
  });
  console.log("getCateringTeams_user", response.data);
  return response.data;
};

export const getVenueTeams_user = async () => {
  const response = await axios.get(`${API_URL}/venues/user`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    },
  });
  console.log("getVenueTeams_user", response.data);
  return response.data;
};

// DELETE requests
export const deleteDecorationTeam = async (id) => {
  const response = await axios.delete(`${API_URL}/decorations/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    },
  });
  console.log(`Deleted decoration team with ID: ${id}`);
  return response.data;
};

export const deleteCateringTeam = async (id) => {
  const response = await axios.delete(`${API_URL}/caterings/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    },
  });
  console.log(`Deleted catering team with ID: ${id}`);
  return response.data;
};

export const deleteVenueTeam = async (id) => {
  const response = await axios.delete(`${API_URL}/venues/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': getToken(),
    },
  });
  console.log(`Deleted venue team with ID: ${id}`);
  return response.data;
};

// New: Feedback-related requests
export const getFeedbacks = async (eventid) => {
  const response = await axios.get(`${API_URL}/feedback/${eventid}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getToken(),
    },
  });
  console.log("Feedbacks retrieved", response.data);
  return response.data;
};

export const addFeedback = async (feedback) => {
  const response = await axios.post(`${API_URL}/feedback/add`, { feedback }, {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getToken(),
    },
  });
  console.log("Feedback added", response.data);
  return response.data;
};
