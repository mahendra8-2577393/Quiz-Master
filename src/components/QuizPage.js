import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import ProgressBar from "./ProgressBar";
import "../styles/QuizPage.css";

const QuizPage = ({user , setUser}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .getQuizQuestions(quizId)
      .then((response) => {
        setQuestions(response.questions);
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  }, [quizId]);

  const handleAnswerSubmit = () => {
    const isCorrect =
      questions[currentQuestion].correctAnswer === selectedAnswer;
    if (isCorrect) setScore(score + 1);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const handleFinishQuiz =()=> {
      setUser(null);
      navigate("/");
  };

  if (!questions.length) return <div>Loading...</div>;

  const current = questions[currentQuestion];

  const getOptionStyle = (option) => {
    if (!showResult) return {};

    if (option === current.correctAnswer) {
      return { backgroundColor: "green", color: "white" };
    }

    if (option === selectedAnswer && option !== current.correctAnswer) {
      return { backgroundColor: "red", color: "white" };
    }

    return { backgroundColor: "white", color: "black" };
  };

  return (
    <div className="quiz-container">
      <h1 style={{ color: 'black' }}>Quiz</h1>
      <ProgressBar current={currentQuestion + 1} total={questions.length} />
      {!quizCompleted ? (
        <>
          <h2 style={{ color: 'black' }}>{current.question}</h2>

          <ul>
            {current.options.map((option, index) => (
              <li key={index}>
                <button
                  style={getOptionStyle(option)}
                  onClick={() => setSelectedAnswer(option)}
                  disabled={showResult}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          {showResult ? (
            <button onClick={handleNextQuestion}>
              {currentQuestion < questions.length - 1
                ? "Next Question"
                : "See Final Score"}
            </button>
          ) : (
            <button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
              Submit Answer
            </button>
          )}
        </>
      ) : (
        <>
          <p style={{ color: 'black' }}>Your final score: {score}</p>
          <button onClick={handleFinishQuiz}>Finish Quiz</button>
        </>
      )}
    </div>
  );
};

export default QuizPage;
