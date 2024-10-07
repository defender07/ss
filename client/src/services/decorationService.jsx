import axios from 'axios';

const API_URL = 'http://localhost:5000/api/decorations';


export const getDecorationTeams = async () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  const response = await axios.get('http://localhost:5000/api/decorations',
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token, // Adding the token in the header
      },
    }
  );
  console.log("organiser decoration",response.data);
  
  return response.data;
};


export const getCateringTeams = async () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  const response = await axios.get('http://localhost:5000/api/caterings',
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token, // Adding the token in the header
      },
    }
  );
  console.log("organiser ",response.data); // Log the fetched data for debugging
  return response.data;
};



export const getVenueTeams = async () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  const response = await axios.get('http://localhost:5000/api/venues',
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token, // Adding the token in the header
      },
    }
  );
  console.log(response.data);

  return response.data;
};




export const addDecorationTeam = async (formData) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  const response = await axios.post('http://localhost:5000/api/decorations/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': token,
    },
  });
  return response.data;
};


export const addVenueTeam = async (formData) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  const response = await axios.post('http://localhost:5000/api/venues/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': token,
    },
  });
  return response.data;
};


export const addCateringTeam = async (formData) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  const response = await axios.post('http://localhost:5000/api/caterings/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': token,
    },
  });
  return response.data;
};



export const getDecorationTeams_user = async () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  const response = await axios.get('http://localhost:5000/api/decorations/user',
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token, // Adding the token in the header
      },
    }
  );
  console.log("getDecorationTeams_user",response.data);
  
  return response.data;
};


export const getCateringTeams_user = async () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  const response = await axios.get('http://localhost:5000/api/caterings/user',
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token, // Adding the token in the header
      },
    }
  );
  console.log(response.data); // Log the fetched data for debugging
  return response.data;
};



export const getVenueTeams_user = async () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  const response = await axios.get('http://localhost:5000/api/venues/user',
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token, // Adding the token in the header
      },
    }
  );
  console.log(response.data);

  return response.data;
};


