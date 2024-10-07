import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [organisers, setOrganisers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch all organizers (both verified and unverified) on component mount
    const fetchOrganisers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/organisers', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setOrganisers(response.data.reverse());
      } catch (err) {
        setError('Failed to fetch organisers');
      }
    };
    fetchOrganisers();
  }, []);

  const handleToggleVerification = async (id, isVerified) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/organisers/${id}/verify`, {}, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setSuccess(`Organiser ${isVerified ? 'unverified' : 'verified'} successfully`);
      
      // Update the organizer's status in the local state
      setOrganisers(organisers.map(org => 
        org._id === id ? { ...org, isVerified: !org.isVerified } : org
      ));
    } catch (err) {
      setError(`Failed to ${isVerified ? 'unverify' : 'verify'} organiser`);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Panel</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {organisers.map(org => (
            <tr key={org._id}>
              <td>{org.username}</td>
              <td>{org.email}</td>
              <td>{org.isVerified ? 'Verified' : 'Unverified'}</td>
              <td>
                <button 
                  className={`btn ${org.isVerified ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => handleToggleVerification(org._id, org.isVerified)}
                >
                  {org.isVerified ? 'Unverify' : 'Verify'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
