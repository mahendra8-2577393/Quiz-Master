import React, { useState } from "react";
import axios from "axios";
import "../styles/AdminPage.css"; // Import the CSS file

const AdminPage = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newQuiz = { title: quizTitle, questions };

    try {
      const response = await axios.post(
        "https://quiz-server-oa39.onrender.com/api/v1/add-quiz",
        newQuiz,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Quiz created successfully!");
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Access forbidden: Admins only");
      } else {
        alert("An error occurred while creating the quiz");
      }
    }
  };

  return (
    <div className="admin-container">
      <h1>Create a New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          required
        />

        {questions.map((question, index) => (
          <div key={index} className="question-box">
            <h5>Question {index + 1}</h5>
            <input
              type="text"
              placeholder={`Enter question ${index + 1}`}
              value={question.question}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].question = e.target.value;
                setQuestions(updatedQuestions);
              }}
              required
            />
            {question.options.map((option, optIndex) => (
              <input
                key={optIndex}
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={option}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].options[optIndex] = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                required
              />
            ))}
            <input
              type="text"
              placeholder="Correct Answer"
              value={question.correctAnswer}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].correctAnswer = e.target.value;
                setQuestions(updatedQuestions);
              }}
              required
            />
          </div>
        ))}

        <button
          type="button"
          className="add-question-btn"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button type="submit" className="submit-btn">
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
