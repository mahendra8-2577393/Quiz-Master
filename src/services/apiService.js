// services/apiService.js
import axios from "axios";

const API_URL = `https://quiz-server-oa39.onrender.com/api/v1`; // Base URL for the API

const apiService = {
  getQuizzes: async () => {
    try {
      const response = await axios.get(`${API_URL}/quizzes`); // Fetch all quizzes
      return response.data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      throw error; // Throw error to be handled in the component
    }
  },

  getQuizQuestions: async (quizId) => {
    // Function to fetch questions for a specific quiz
    try {
      const response = await axios.get(`${API_URL}/quizzes/${quizId}`); // Fetch quiz questions
      console.log(response.data);
      return response.data; // Return the fetched questions
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      throw error; // Throw error to be handled in the component
    }
  },
  submitScore: async (scoreData) => {
    try {
      const response = await axios.post(`${API_URL}/submitScore`, scoreData);
      return response.data; // Return the response data for further use
    } catch (error) {
      console.error("Error submitting score:", error);
      throw error; // Rethrow the error for handling in the component
    }
  },
};

export default apiService;
