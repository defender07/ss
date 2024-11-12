import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [animationStarted, setAnimationStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Start the animation once the component mounts
    setTimeout(() => {
      setAnimationStarted(true);
    }, 100); // slight delay to trigger animation smoothly
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', { email, password })
      .then(response => {
        const { token, isAdmin, isEventOrganiser, isVerified } = response.data;
        console.log(response.data);
        localStorage.setItem('token', token);
        if (isAdmin) {
          navigate('/admin');
        } else if (isEventOrganiser) {
          if (isVerified) {
            navigate('/event-organiser');
          } else {
            setError('Your account is not verified. Please check your email.');
          }
        } else {
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setError('Incorrect email or password. Please try again.');
      });
  };

  // Animation styles
  const animationStyles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#f8f9fa',
      position: 'relative',
      overflow: 'hidden',
    },
    formContainer: {
      width: '400px',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      opacity: animationStarted ? 1 : 0,
      transform: animationStarted ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'all 1s ease-out',
      zIndex: 2, // Ensure form is above background elements
    },
    title: {
      fontSize: '2rem',
      textAlign: 'center',
      marginBottom: '20px',
    },
    overlayTop: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '50%',
      backgroundColor: '#007bff',
      transform: animationStarted ? 'translateY(-100%)' : 'translateY(0)',
      transition: 'transform 1s ease-in-out',
      zIndex: 1,
    },
    overlayBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '50%',
      backgroundColor: '#007bff',
      transform: animationStarted ? 'translateY(100%)' : 'translateY(0)',
      transition: 'transform 1s ease-in-out',
      zIndex: 1,
    },
  };

  return (
    <div style={animationStyles.wrapper}>
      {/* Curtain animation (overlay) */}
      <div style={animationStyles.overlayTop}></div>
      <div style={animationStyles.overlayBottom}></div>

      <div style={animationStyles.formContainer}>
        <h2 style={animationStyles.title}>Login</h2>
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
  );
}

export default LoginPage;
