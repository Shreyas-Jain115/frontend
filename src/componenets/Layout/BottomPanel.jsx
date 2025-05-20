import React, { useState, useEffect } from "react";
import { useQuestions } from "../../context/questionContext";
import "./BottomPanel.css";

const BottomPanel = () => {
  const { selectedQuestion, testResult } = useQuestions();

  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);

  useEffect(() => {
    setSelectedTestCaseIndex(0);
  }, [selectedQuestion]);

  if (!selectedQuestion || !selectedQuestion.testCases) {
    return (
      <div className="no-test-cases">
        <p>No test cases available.</p>
      </div>
    );
  }

  const selectedTestCase = selectedQuestion.testCases[selectedTestCaseIndex];
  // const resultForQuestion = testResult[1] || {};
  const resultForQuestion = testResult?.[String(selectedQuestion.id)] || {};

  return (
    <div className="bottom-panel">
      <div className="test-case-selector">
        <label>Test Case:</label>
        <div className="test-case-buttons">
          {selectedQuestion.testCases.map((_, index) => {
            const testKey = `Test ${index + 1}`;
            const testPassed = resultForQuestion[testKey];

            return (
              <button
                key={index}
                className={`test-case-btn 
                  ${selectedTestCaseIndex === index ? "active" : ""} 
                  ${
                    testPassed === true
                      ? "pass"
                      : testPassed === false
                      ? "fail"
                      : ""
                  }`}
                onClick={() => setSelectedTestCaseIndex(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="test-case-details">
        <div className="detail-row">
          <strong>Input:</strong>
          <div className="input-grid">
            {Object.entries(selectedTestCase.input)
              .slice(0, 4) // 👈 Only first 4 inputs
              .map(([key, value], idx) => (
                <div className="input-item" key={idx}>
                  <span className="input-key">
                    <strong>{key}:</strong>
                  </span>
                  <span className="input-value">
                    {typeof value === "string" && value.trim().startsWith("[")
                      ? JSON.stringify(JSON.parse(value))
                      : value}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="detail-row">
          <strong>Expected Output:</strong>
          <span>{JSON.stringify(selectedTestCase.output)}</span>
        </div>
      </div>
    </div>
  );
};

export default BottomPanel;
