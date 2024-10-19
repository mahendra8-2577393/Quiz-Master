// components/Register.js
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import '../styles/Auth.css'; // Link to the CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to manage error messages
  const [success, setSuccess] = useState(''); // State to manage success messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend to register the user
      const response = await axios.post('http://localhost:5000/api/v1/register', {
        username,
        email,
        password,
      });

      // Handle successful registration
      setSuccess(response.data.message);
      setError(''); // Clear any previous error messages

      // Optionally, clear the input fields
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      // Handle errors (e.g., user already exists)
      if (error.response) {
        setError(error.response.data.message || 'Registration failed');
        setSuccess(''); // Clear any previous success messages
      } else {
        setError('Server error, please try again later.');
        setSuccess('');
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Register</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="auth-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
