import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { useQuestions } from "../../context/questionContext";
import TestResultPopup from "./TestResultPopup";

const TopPanel = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [summary, setSummary] = useState({ passed: 0, failed: 0 });
// console.log("SummarY",summary);
 const {updateQuestionScore} = useQuestions();
  const {
    selectedQuestion,
    testResult,
    currentCode,
    setCurrentCodeHandler,
    generateCppWithTests,
  } = useQuestions();
  console.log(selectedQuestion.codeTemplate);

  const getTestSummaryForSelectedQuestion = () => {
    if (!selectedQuestion || !testResult[selectedQuestion.id]) {
      return { passed: 0, failed: 0 };
    }

    const results = testResult[selectedQuestion.id];
    const passed = Object.values(results).filter((val) => val === true).length;
    const failed = Object.values(results).filter((val) => val === false).length;

    return { passed, failed };
  };

  const handleSubmit = () => {
    // const { passed, failed } = getTestSummaryForSelectedQuestion();
    // setSummary({ passed, failed });
    // setShowPopup(true);
    const { passed, failed } = getTestSummaryForSelectedQuestion();
  const totalScore = passed * 5; // 5 marks per passed test case

  setSummary({ passed, failed });
  setShowPopup(true);

  if (selectedQuestion && selectedQuestion.id) {
    updateQuestionScore(selectedQuestion.id, totalScore);
  }
  };

  return (
    <div
      style={{
        background: "#282c34",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "10px",
          background: "#1e1e2f",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label style={{ color: "white" }}>Language: CPP</label>
        <button
          onClick={() => {
            // if (
            //   selectedQuestion.totalarray === 2 &&
            //   selectedQuestion.totalint === 1
            // )
            generateCppWithTests(
              currentCode,
              selectedQuestion.tests,
              selectedQuestion.codeTemplate
            );
          }}
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            background: "#5A20CB",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Run
        </button>
        <button
          onClick={handleSubmit}
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            background: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>

      <div style={{ flexGrow: 1 }}>
        <Editor
          height="100%"
          width="100%"
          language="cpp"
          value={currentCode}
          onChange={(newCode) => setCurrentCodeHandler(newCode)}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>

      {showPopup && (
        <TestResultPopup
          passed={summary.passed}
          failed={summary.failed}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default TopPanel;

