import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuestions } from "../context/questionContext";
import { useNavigate } from "react-router-dom";
import "./Questions.css"; // Import a dedicated CSS file

// Helper function to get difficulty badge class
const getDifficultyClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "badge bg-success text-dark-emphasis"; // Brighter green for dark theme
    case "medium":
      return "badge bg-warning text-dark-emphasis"; // Standard warning yellow
    case "hard":
      return "badge bg-danger text-dark-emphasis"; // Standard danger red
    default:
      return "badge bg-secondary"; // Default grey
  }
};

const Questions = () => {
  const { questionsData, handleSelectQuestion } = useQuestions();
  const navigate = useNavigate();

  const handleSolveClick = (questionId) => {
    handleSelectQuestion(questionId);
    navigate(`/solve/${questionId}`);
  };

  return (
    <div className="questions-container">
      <h1 className="questions-title">Coding Challenges</h1>
      <div className="questions-list">
        {questionsData.map((question) => (
          <div
            key={question.id}
            className="question-card"
            onClick={() => handleSolveClick(question.id)} // Make the whole card clickable
          >
            <div className="card-header">
              <h4 className="question-title">
                {question.id}. {question.title}
              </h4>
              <span
                className={`difficulty-badge ${getDifficultyClass(
                  question.difficulty
                )}`}
              >
                {question.difficulty}
              </span>
            </div>
            <p className="question-description">{question.description}</p>
            <div className="question-details">
              <div className="detail-item">
                <strong>Avg Time:</strong> {question.avgTime || "N/A"}
              </div>
              <div className="detail-item">
                <strong>Time:</strong> O({question.complexity?.time || "?"})
              </div>
              <div className="detail-item">
                <strong>Space:</strong> O({question.complexity?.space || "?"})
              </div>
            </div>
            {/* Removed the explicit button, the whole card is clickable */}
            {/* If you still want an explicit button, uncomment below and remove onClick from the main div */}
            {/* <button
              className="btn btn-solve btn-sm"
              onClick={(e) => {
                 e.stopPropagation(); // Prevent card click when button is clicked
                 handleSolveClick(question.id);
              }}
            >
              Solve Challenge
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
