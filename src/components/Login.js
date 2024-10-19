import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css'; // Link to the CSS file
import "../styles/Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://quiz-server-oa39.onrender.com/api/v1/login', { email, password });
      const userData = response.data;

      if (userData && userData.user) {
        const { user, accessToken } = userData;
        onLogin(user);

        if (accessToken) {
          localStorage.setItem('token', accessToken);
        }

        setEmail('');
        setPassword('');

        if (user.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError('User data is not available. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid login credentials. Please try again.');
        } else {
          setError('An error occurred: ' + (err.response.data.message || 'Please try again later.'));
        }
      } else {
        setError('Network error. Please check your connection or try again later.');
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Login</h2>

        {error && <p className="error-message">{error}</p>}

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

        <button type="submit" className="auth-btn">Login</button>
        <p className="redirect-text">Don't have an account? <a href="/register">Register here</a></p>
      </form>
    </div>
  );
};

export default Login;
