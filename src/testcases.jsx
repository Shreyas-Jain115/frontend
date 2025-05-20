import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { LANGUAGE_VERSIONS } from "../../constants";
import { runCode } from "../../services/codeRunner.js";
import { useQuestions } from "../../context/questionContext";

const TopPanel = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const { selectedQuestion, currentCode, setCurrentCode } = useQuestions();
    const [mergedCode, setMergedCode] = useState("");

    useEffect(() => {
        if (selectedQuestion && selectedLanguage && selectedQuestion.codeTemplate[selectedLanguage]) {
            setCode(selectedQuestion.codeTemplate[selectedLanguage].functionSignature);
            setCurrentCode(selectedQuestion.codeTemplate[selectedLanguage].functionSignature);
        } else {
            setCode(`// Start coding in ${selectedLanguage}...`);
            setCurrentCode(`// Start coding in ${selectedLanguage}...`);
        }
    }, [selectedQuestion, selectedLanguage, setCurrentCode]);

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        setSelectedLanguage(newLanguage);
        if (selectedQuestion && selectedQuestion.codeTemplate[newLanguage]) {
            setCode(selectedQuestion.codeTemplate[newLanguage].functionSignature);
            setCurrentCode(selectedQuestion.codeTemplate[newLanguage].functionSignature);
        } else {
            setCode(`// Start coding in ${newLanguage}...`);
            setCurrentCode(`// Start coding in ${newLanguage}...`);
        }
    };
    const handleRun = async () => {
      setCurrentCode(code);
      const result = await runCode(code, selectedLanguage, "");
      setOutput(result);
  
      let merged = code;
      let functionName = "myFunction";
  
      // Regex to match function definitions
      const functionRegex = /\b(?:int|float|void|char|double|string)\s+(\w+)\s*\(/;
      const match = code.match(functionRegex);
      if (match) functionName = match[1];
  
      if (selectedLanguage === "javascript") {
          merged = `${code}\n\nconsole.log(${functionName}(1, 2));`;
      } else if (selectedLanguage === "python") {
          merged = `${code}\n\nif __name__ == "__main__":\n    print(${functionName}(1,2))`;
      } else if (selectedLanguage === "c") {
          // If main() doesn't exist, add it
          if (!code.includes("main(")) {
              merged = `#include <stdio.h>\n\n${code}\n\nint main() {\n    printf("%d\\n", ${functionName}(1,2));\n    return 0;\n}`;
          }
      } else if (selectedLanguage === "java") {
          merged = `public class Main {\n    ${code}\n    public static void main(String[] args) {\n        System.out.println(${functionName}(1,2));\n    }\n}`;
      }
  
      setMergedCode(merged);
      console.log("Merged Code:", merged);
  };
  
  

    const handleSubmit = async () => {
        setCurrentCode(code);
        let allTestResults = "";
        if (!selectedQuestion || !selectedQuestion.testCases) {
            allTestResults = "No test cases available.";
        } else {
            for (let testCase of selectedQuestion.testCases) {
                try {
                    let result;
                    if (selectedLanguage === "javascript") {
                        const func = eval(`(${code})`);
                        result = func(...testCase.input);
                    } else {
                        result = await runCode(code, selectedLanguage, testCase.input.join(" "));
                    }

                    const testResult = `\nTest Case: ${testCase.input}\nExpected Output: ${testCase.expected}\nReceived Output: ${result}\n${result == testCase.expected ? "✅ Passed" : "❌ Failed"}\n-------------------`;
                    
                    allTestResults += testResult + "\n";
                } catch (error) {
                    allTestResults += `Error executing test case: ${error}\n-------------------\n`;
                }
            }
        }
        setOutput(allTestResults);
    };

    return (
        <div style={{ background: "#282c34", height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "10px", background: "#1e1e2f", display: "flex", alignItems: "center", gap: "10px" }}>
                <label style={{ color: "white" }}>Language:</label>
                <select value={selectedLanguage} onChange={handleLanguageChange} style={{ padding: "4px", borderRadius: "4px", background: "#333545", color: "white", border: "none", fontSize: "14px" }}>
                    {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
                  
                  <option key={lang} value={lang}>
                            {lang.toUpperCase()} ({LANGUAGE_VERSIONS[lang]})
                        </option>
                    ))}     
                </select>
                <button onClick={handleRun} style={{ padding: "5px 10px", borderRadius: "4px", background: "#5A20CB", color: "white", border: "none", cursor: "pointer" }}>
                    Run
                </button>
                <button onClick={handleSubmit} style={{ padding: "5px 10px", borderRadius: "4px", background: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
                    Submit
                </button>
            </div>
            <div style={{ flexGrow: 1 }}>
                <Editor height="100%" width="100%" language={selectedLanguage} value={code} onChange={(newCode) => { setCode(newCode); setCurrentCode(newCode); }} theme="vs-dark" options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }} />
            </div>
            <div style={{ padding: "10px", background: "#1e1e2f", color: "white", minHeight: "50px", overflowY: "auto", paddingBottom: "30px" }}>
                <strong>Output:</strong>
                <pre style={{ whiteSpace: "pre-wrap" }}>{output}</pre>
            </div>
        </div>
    );
};

export default TopPanel;
