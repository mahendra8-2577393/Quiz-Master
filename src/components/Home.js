import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/Home.css"; // Import CSS for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Quiz Platform!</h1>
      <p>
        Test your knowledge and improve your skills with our diverse range of
        quizzes. Whether you're preparing for exams or just want to challenge
        yourself, we have something for everyone!
      </p>
      <Link to="/login">
        <button className="login-button" aria-label="Login to access quizzes">
          {" "}
          {/* Added aria-label for accessibility */}
          Login to Access Quizzes
        </button>
      </Link>
      <div className="feature-section">
        <h2>Why Choose Us?</h2>
        <ul className="feature-list">
          <li>
            🧠 <strong>Diverse Quizzes</strong>: Explore quizzes across various
            subjects.
          </li>
          <li>
            🏆 <strong>Track Your Progress</strong>: Monitor your learning
            journey and improvement.
          </li>
          <li>
            🌐 <strong>User-Friendly Interface</strong>: Navigate easily and
            enjoy your learning experience.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
