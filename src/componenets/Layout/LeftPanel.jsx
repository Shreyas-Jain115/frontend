import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuestions } from "../../context/questionContext";

const LeftPanel = () => {
  const { selectedQuestion } = useQuestions();

  if (!selectedQuestion) {
    return (
      <div
        className="container-fluid text-white p-4"
        style={{
          backgroundColor: "#181818",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div
          className="border p-4 rounded h-100 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: "#222232", borderColor: "#444" }}
        >
          <p className="text-light">Select a question to view details.</p>
        </div>
      </div>
    );
  }

  // Parses and formats the input JSON
  const formatInput = (input) => {
    const parseValue = (val) => {
      try {
        if (
          typeof val === "string" &&
          (val.trim().startsWith("[") || val.trim().startsWith("{"))
        ) {
          return JSON.parse(val);
        }
      } catch (e) {}
      return val;
    };

    if (typeof input !== "object" || input === null) return input;

    const parsed = {};
    for (let key in input) {
      parsed[key] = parseValue(input[key]);
    }

    return JSON.stringify(parsed, null, 2); // 2-space indentation
  };

  return (
    <div
      className="container-fluid text-white p-4"
      style={{
        backgroundColor: "#181818",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div
        className="border p-4 rounded h-100 d-flex flex-column"
        style={{ backgroundColor: "#222232", borderColor: "#444" }}
      >
        <h3 className="fw-bold text-light mb-3" style={{ fontSize: "1.8rem" }}>
          {selectedQuestion.id}. {selectedQuestion.title}
        </h3>

        <div className="d-flex flex-wrap align-items-center mb-3">
          <span
            className="badge rounded-pill bg-warning text-dark me-2 mb-2"
            style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
          >
            {selectedQuestion.difficulty}
          </span>
          <span
            className="badge rounded-pill bg-secondary mb-2"
            style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
          >
            Time: {selectedQuestion.complexity.time} | Space:{" "}
            {selectedQuestion.complexity.space}
          </span>
        </div>

        <p className="text-light mb-3" style={{ fontSize: "0.95rem" }}>
          {selectedQuestion.description}
        </p>

        <hr className="border-secondary" />

        <h5 className="text-light mb-2" style={{ fontSize: "1.1rem" }}>
          Test Cases
        </h5>

        <div className="flex-grow-1 overflow-auto">
          {selectedQuestion.testCases.map((testCase, index) => (
            <div
              key={index}
              className="mb-3 p-3 rounded"
              style={{
                backgroundColor: "#2a2a3b",
                border: "1px solid #555",
                borderRadius: "12px",
              }}
            >
              <strong className="text-warning">
                <span style={{ color: "#ffc107" }}>{testCase.example}</span>
              </strong>
              <br />

              <strong className="text-info">
                <span style={{ color: "#0dcaf0" }}>Input:</span>
              </strong>
              <pre
                style={{
                  backgroundColor: "#1e1e2f",
                  color: "#d4d4d4",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  padding: "1rem",
                  borderRadius: "8px",
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  border: "1px solid #444",
                  lineHeight: "1.5",
                  marginBottom: "1rem",
                }}
              >
                {formatInput(testCase.input)}
              </pre>

              <strong className="text-success">
                <span style={{ color: "#28a745" }}>Output:</span>
              </strong>{" "}
              {Array.isArray(testCase.output)
                ? `[${testCase.output.join(", ")}]`
                : testCase.output}
              <br />

              <p className="text-light mt-2" style={{ fontSize: "0.9rem" }}>
                {testCase.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
