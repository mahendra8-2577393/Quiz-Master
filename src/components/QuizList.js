// components/QuizList.js
import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { useNavigate } from "react-router-dom";
import "../styles/QuizList.css"; // Import the CSS file

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await apiService.getQuizzes();
        console.log("Fetched quizzes:", data); // Log the fetched data
        setQuizzes(data); // Set the state with fetched quizzes
      } catch (error) {
        console.error("Error fetching quizzes:", error); // Log any errors
      }
    };

    fetchQuizzes();
  }, []); // Run once on mount

  const handleQuizSelect = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="quiz-container">
      <h1 style={{ color: 'black' }}>Select a Quiz</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <button onClick={() => handleQuizSelect(quiz._id)}>
              {quiz.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
