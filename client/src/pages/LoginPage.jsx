import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Correct hook name

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', { email, password })
      .then(response => {
        const { token, isAdmin, isEventOrganiser, isVerified } = response.data;
        console.log(response.data);
        localStorage.setItem('token', token);
        if (isAdmin) {
          navigate('/admin'); // Redirect to admin page
        } else if (isEventOrganiser) {
          if (isVerified) {
            navigate('/event-organiser'); // Redirect to event organiser panel
          }else{
            setError('not verified');
          }
        } else {
          navigate('/'); // Redirect to home page or other default page
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setError('Error logging in'); // Set error message to state
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
