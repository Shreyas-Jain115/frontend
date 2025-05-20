import React, { createContext, useState, useEffect, useContext } from "react";
// import { questionsData } from "../questionsData";
import { questionsData } from "../questionsdata";
import { runCode } from "../services/codeRunner.js";
const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(
    questionsData[0] || null
  ); // Set the first object as default
  const [currentCode, setCurrentCode] = useState(
    selectedQuestion ? selectedQuestion.codeTemplate.functionSignature : ""
  ); // Store current code
  const [testResult, setTestResults] = useState({});
  const [examCode, setExamCode] = useState("");
  const [questionscore, setQuestionscore] = useState({});
  const updateQuestionScore = (questionId, score) => {
    console.log("Updating score for question:", questionId, "Score:", score);
  setQuestionscore((prevScores) => {
    const updatedScores = {
      ...prevScores,
      [questionId]: score,
    };
    console.log("Updated Question Scores:", updatedScores);
    return updatedScores;
  });
};


  const setCurrentCodeHandler = (code) => {
    setCurrentCode(code);
  };
  async function generateCppWithTests(userCode, testCases, codeTemplate) {
    console.log(userCode, selectedQuestion.id);

    if (!codeTemplate || !codeTemplate.template || !codeTemplate.functionName) {
      console.error("Invalid codeTemplate structure:", codeTemplate);
      return;
    }

    const functionName = codeTemplate.functionName;
    let testCode = "";
    const lastparam = codeTemplate.lastparam || ""; // Get the last parameter if it exists
    if (codeTemplate.twoArrays) {
      // for two array and one number
      testCases.forEach((tc, index) => {
        const param = tc[codeTemplate.lastparam];
        const arr1Str = tc.arr1.join(",");
        const arr2Str = tc.arr2.join(",");

        testCode += `
      int arr1_${index}[] = {${arr1Str}};
      int arr2_${index}[] = {${arr2Str}};
      int result_${index} = ${functionName}(arr1_${index}, ${
          tc.size1
        }, arr2_${index}, ${tc.size2},  ${param});
      cout << "Test ${index + 1}: " << (result_${index} == ${
          tc.expected
        } ? "✅ Pass" : "❌ Fail") << endl;
      `;
      });
    }

    if (codeTemplate.oneArray) {
      // for One array and one number
      testCases.forEach((tc, index) => {
        const param = tc[codeTemplate.lastparam];
        const arr1Str = tc.arr1.join(",");
        const arr2Str = tc.arr2.join(",");

        testCode += `
      int arr1_${index}[] = {${arr1Str}};
      int result_${index} = ${functionName}(arr1_${index}, ${
          tc.size1
        },  ${param});
      cout << "Test ${index + 1}: " << (result_${index} == ${
          tc.expected
        } ? "✅ Pass" : "❌ Fail") << endl;
      `;
      });
    }
    const finalCode = codeTemplate.template
      .replace("{{USER_CODE}}", userCode)
      .replace("{{TEST_CASES}}", testCode);

    console.log(finalCode);

    const output = await runCode(finalCode, "cpp");
    console.log("Output:", output);
    const resultObj = parseJudgeOutput(output);
    setTestResults((prev) => ({
      ...prev,
      [selectedQuestion.id]: resultObj,
    }));
  }

  function parseJudgeOutput(output) {
    const resultObj = {};
    const lines = output.trim().split("\n");

    lines.forEach((line) => {
      const match = line.match(/Test (\d+): (✅ Pass|❌ Fail)/);
      if (match) {
        const testNum = `Test ${match[1]}`; // FIXED: Use backticks for template literal
        const passed = match[2].includes("✅");
        resultObj[testNum] = passed;
      }
    });

    return resultObj;
  }

  // const updateExpectedAndCode = (id, caseNum, newUser, newExpected, newCode) => {
  //   setResults(r => r.map(res =>
  //     res.id === id && res.case === caseNum
  //       ? { ...res, user: newUser, expected: newExpected, code: newCode }
  //       : res
  //   ));
  // };

  const handleSelectQuestion = (questionId) => {
    const question = questionsData.find((q) => q.id === questionId);
    // console.log(question);
    setSelectedQuestion(question);
    setCurrentCode(question.codeTemplate.functionSignature || ""); // Update current code when question changes
  };

  return (
    <QuestionsContext.Provider
      value={{
        // updateExpectedAndCode,
        selectedQuestion,
        setSelectedQuestion,
        currentCode,
        setCurrentCode, // Expose function to update code
        questionsData,
        examCode,
        setExamCode,
        questionscore,
        setQuestionscore,
        testResult,
        generateCppWithTests,
        updateQuestionScore,
        handleSelectQuestion,
        setCurrentCodeHandler,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  return useContext(QuestionsContext);
};
