import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/leaderboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLeaderboard(response.data);
        setIsAdmin(true);  // Assuming API will reject unauthorized requests
      } catch (error) {
        if (error.response?.status === 403) {
          alert('Access forbidden: Admins only');
        } else {
          console.error('Error fetching leaderboard:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAdmin) {
    return <p>Access forbidden: Admins only</p>;
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry._id}>
            {entry.name}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
