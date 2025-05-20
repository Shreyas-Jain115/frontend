import React, { useEffect, useState } from "react";
import { questionsData } from "../questionsdata";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../context/questionContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionsList = () => {
  const { selectedQuestion, handleSelectQuestion, questionscore } = useQuestions();
  const [questionList, setQuestionList] = useState([]);
  const navigate = useNavigate();
  const { examCode } = useQuestions();
  const [message, setMessage] = useState("");
  const [matchedData, setMatchedData] = useState([]);
  const [riskScore, setRiskScore] = useState(0);
  const url = "https://1w7vd0hz-5000.inc1.devtunnels.ms/";

  useEffect(() => {
    const fetchQuestionIds = async () => {
      const db = getDatabase();
      const snapshot = await get(ref(db, `companyid/${examCode}`));

      if (snapshot.exists()) {
        const idsObject = snapshot.val();
        const ids = Object.values(idsObject);

        const matchedQuestions = questionsData.filter((question) =>
          ids.includes(question.id)
        );

        setQuestionList(matchedQuestions);
      } else {
        console.log("No data available");
      }
    };

    const clearData = async () => {
      try {
        const response = await fetch(url + "clear-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setMessage(data.message || data.error);
      } catch (error) {
        setMessage("An error occurred while clearing data.");
      }
    };

    clearData();

    fetchQuestionIds();
  }, [examCode]);

  const handleSolve = (id) => {
    handleSelectQuestion(id);
    navigate(`/solve/${id}`);
  };

  const handleSubmitTest = async () => {
    let totalScore = 0;
    for (const score of Object.values(questionscore)) {
      totalScore += score;
    }

    // Call processMatchedData and wait for risk score calculation
    await processMatchedData();

    // Log the riskScore
    console.log(`Final Risk Score: ${riskScore}`);

    toast.success("✅ Test submitted successfully!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
    });

    console.log(`Final Score: ${totalScore}`);
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  const calculateRiskScore = (data) => {
    return new Promise((resolve) => {
      let totalRiskScore = 0;

      data.forEach((item) => {
        const faceDetection = safeJsonParse(item.face_detection);
        const gazeDetection = safeJsonParse(item.gaze_detection);
        const multipleFaces = safeJsonParse(item.multiple_faces);
        const identityVerification = safeJsonParse(item.identity_verification);
        const livenessDetection = safeJsonParse(item.liveness_detection);
        const person = safeJsonParse(item.person);
        const electronicDevices = safeJsonParse(item.electronic_devices);
        const activity = safeJsonParse(item.activity);

        if (!(gazeDetection?.gaze_status === "Looking at Screen" || activity?.looking_at_screen)) {
          totalRiskScore += 5;
        }
        if (faceDetection?.status !== "valid") {
          totalRiskScore += 3;
        }
        if (multipleFaces?.multiple_faces !== "One Face Detected") {
          totalRiskScore += 3;
        }
        if (identityVerification?.identity_status !== "Same Face") {
          totalRiskScore += 3;
        }
        if (livenessDetection?.liveness_status !== "Real Face Detected") {
          totalRiskScore += 3;
        }
        if (person?.status !== "valid" || person?.message !== "One person detected.") {
          totalRiskScore += 3;
        }
        if (electronicDevices?.status !== "valid" || electronicDevices?.message !== "Only one laptop detected.") {
          totalRiskScore += 2;
        }
        if (!activity?.sitting) {
          totalRiskScore += 5;
        }
      });

      // Set state and resolve the promise
      setRiskScore(totalRiskScore);
      resolve(totalRiskScore);
    });
  };

  const safeJsonParse = (value) => {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  const processMatchedData = async () => {
    try {
      const response = await fetch(url + "process-matched-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data.result) {
        setMatchedData(data.data);
        console.log("Matched Data:", data.data);
        setMessage(data.message);

        // Wait for risk score calculation to complete
        const calculatedScore = await calculateRiskScore(data.data);
        console.log(`Risk Score (after calculation): ${calculatedScore}`);
      } else {
        setMessage(data.error || "An error occurred.");
      }
    } catch (error) {
      setMessage("An error occurred while processing matched data.");
    }
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen p-6">
      <ToastContainer />

      <div className="flex justify-center mb-6">
        <button
          className="bg-[#e60073] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#cc0066] transition duration-300"
          onClick={handleSubmitTest}
        >
          Submit Test
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questionList.map((question) => (
          <div
            key={question.id}
            className="bg-[#1a1a1a] border border-[#ff00ff] rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold text-white mb-2">
              {question.title}
            </h2>
            <p className="text-sm text-gray-300 mb-3">{question.description}</p>
            <div className="text-sm text-gray-400 mb-2">
              <strong>Difficulty:</strong>{" "}
              <span
                className={
                  question.difficulty === "Easy"
                    ? "text-green-400"
                    : question.difficulty === "Medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }
              >
                {question.difficulty}
              </span>
            </div>
            <div className="text-sm text-gray-400 mb-4">
              <strong>Avg Time:</strong> {question.avgTime}
            </div>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              onClick={() => handleSolve(question.id)}
            >
              Solve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;

// import React, { useEffect, useState } from "react";
// import { questionsData } from "../questionsdata";
// import { getDatabase, ref, get } from "firebase/database";
// import { useNavigate } from "react-router-dom";
// import { useQuestions } from "../context/questionContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const QuestionsList = () => {
//   const { selectedQuestion, handleSelectQuestion, questionscore } =
//     useQuestions();
//   const [questionList, setQuestionList] = useState([]);
//   const navigate = useNavigate();
//   const { examCode } = useQuestions();
//   const [message, setMessage] = useState("");
//   const [matchedData, setMatchedData] = useState([]);
//   const [riskScore, setRiskScore] = useState(0);
//   const url = "https://1w7vd0hz-5000.inc1.devtunnels.ms/";

//   useEffect(() => {
//     const fetchQuestionIds = async () => {
//       const db = getDatabase();
//       const snapshot = await get(ref(db, `companyid/${examCode}`));

//       if (snapshot.exists()) {
//         const idsObject = snapshot.val();
//         const ids = Object.values(idsObject);

//         const matchedQuestions = questionsData.filter((question) =>
//           ids.includes(question.id)
//         );

//         setQuestionList(matchedQuestions);
//       } else {
//         console.log("No data available");
//       }
//     };

//     fetchQuestionIds();
//   }, [examCode]);

//   const handleSolve = (id) => {
//     handleSelectQuestion(id);
//     navigate(`/solve/${id}`);
//   };

//   const handleSubmitTest = async () => {
//     let totalScore = 0;
//     for (const score of Object.values(questionscore)) {
//       totalScore += score;
//     }

//     // Call processMatchedData to calculate riskScore
//     await processMatchedData();

//     // Log the riskScore
//     console.log(`Risk Score: ${riskScore}`);

//     toast.success("✅ Test submitted successfully!", {
//       position: "top-center",
//       autoClose: 2500,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: false,
//       draggable: false,
//       theme: "dark",
//     });
    
//     console.log(`Final Score: ${totalScore}`);
//     setTimeout(() => {
//       navigate("/dashboard");
//     }, 3000);
//   };

//   const calculateRiskScore = (data) => {
//     let totalRiskScore = 0;

//     data.forEach((item) => {
//       const faceDetection = safeJsonParse(item.face_detection);
//       const gazeDetection = safeJsonParse(item.gaze_detection);
//       const multipleFaces = safeJsonParse(item.multiple_faces);
//       const identityVerification = safeJsonParse(item.identity_verification);
//       const livenessDetection = safeJsonParse(item.liveness_detection);
//       const person = safeJsonParse(item.person);
//       const electronicDevices = safeJsonParse(item.electronic_devices);
//       const activity = safeJsonParse(item.activity);

//       // Rule 1: Gaze detection or activity looking at screen
//       if (
//         !(gazeDetection?.gaze_status === "Looking at Screen" || activity?.looking_at_screen)
//       ) {
//         totalRiskScore += 5;
//       }

//       // Rule 2: Face detection
//       if (faceDetection?.status !== "valid") {
//         totalRiskScore += 3;
//       }

//       // Rule 3: Multiple faces
//       if (multipleFaces?.multiple_faces !== "One Face Detected") {
//         totalRiskScore += 3;
//       }

//       // Rule 4: Identity verification
//       if (identityVerification?.identity_status !== "Same Face") {
//         totalRiskScore += 3;
//       }

//       // Rule 5: Liveness detection
//       if (livenessDetection?.liveness_status !== "Real Face Detected") {
//         totalRiskScore += 3;
//       }

//       // Rule 6: Person detection
//       if (person?.status !== "valid" || person?.message !== "One person detected.") {
//         totalRiskScore += 3;
//       }

//       // Rule 7: Electronic devices
//       if (
//         electronicDevices?.status !== "valid" ||
//         electronicDevices?.message !== "Only one laptop detected."
//       ) {
//         totalRiskScore += 2;
//       }

//       // Rule 8: Activity sitting
//       if (!activity?.sitting) {
//         totalRiskScore += 5;
//       }
//     });

//     setRiskScore(totalRiskScore);
//   };

//   const safeJsonParse = (value) => {
//     try {
//       return JSON.parse(value);
//     } catch {
//       return value;
//     }
//   };

//   const processMatchedData = async () => {
//     try {
//       const response = await fetch(url + "process-matched-data", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await response.json();
//       if (data.result) {
//         setMatchedData(data.data); // Use the 'data' field from the backend response
//         console.log("Matched Data:", data.data);
//         setMessage(data.message);
//         calculateRiskScore(data.data);
//       } else {
//         setMessage(data.error || "An error occurred.");
//       }
//     } catch (error) {
//       setMessage("An error occurred while processing matched data.");
//     }
//   };

//   return (
//     <div className="bg-[#0f0f0f] min-h-screen p-6">
//       <ToastContainer />

//       <div className="flex justify-center mb-6">
//         <button
//           className="bg-[#e60073] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#cc0066] transition duration-300"
//           onClick={handleSubmitTest}
//         >
//           Submit Test
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {questionList.map((question) => (
//           <div
//             key={question.id}
//             className="bg-[#1a1a1a] border border-[#ff00ff] rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
//           >
//             <h2 className="text-xl font-semibold text-white mb-2">
//               {question.title}
//             </h2>
//             <p className="text-sm text-gray-300 mb-3">{question.description}</p>
//             <div className="text-sm text-gray-400 mb-2">
//               <strong>Difficulty:</strong>{" "}
//               <span
//                 className={
//                   question.difficulty === "Easy"
//                     ? "text-green-400"
//                     : question.difficulty === "Medium"
//                     ? "text-yellow-400"
//                     : "text-red-400"
//                 }
//               >
//                 {question.difficulty}
//               </span>
//             </div>
//             <div className="text-sm text-gray-400 mb-4">
//               <strong>Avg Time:</strong> {question.avgTime}
//             </div>
//             <button
//               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//               onClick={() => handleSolve(question.id)}
//             >
//               Solve
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuestionsList;
