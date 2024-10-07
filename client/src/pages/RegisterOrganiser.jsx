// src/pages/RegisterOrganiser.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterOrganiser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/register-organiser', { username, email, password })
      .then(response => {
        alert('Event organiser registered. Awaiting admin verification.');
      })
      .catch(error => {
        console.error('Error registering organiser:', error);
        alert('Error registering organiser');
      });
  };

  return (
    <div className="container">
      <h2>Register Event Organiser</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterOrganiser;
