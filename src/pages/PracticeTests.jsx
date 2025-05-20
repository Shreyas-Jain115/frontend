
  import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PracticeTests = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleStartTest = () => {
    if (agreed) {
      navigate("/test");
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Test Instructions</h1>

      <h2 className="text-xl font-semibold mt-4 mb-2">1. Company-Decided Mode (Fully Customizable)</h2>
      <ul className="list-disc pl-5 mb-4">
        <li className="mb-1">Companies choose questions, difficulty levels, time limits, and passing criteria.</li>
        <li className="mb-1">They set the cheating risk threshold for elimination.</li>
        <li>They decide evaluation methods (auto/manual).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">2. Auto-Configured Mode (We Decide Everything)</h2>
      <ul className="list-disc pl-5 mb-4">
        <li className="mb-1">AI selects questions from a predefined question bank based on job role & difficulty.</li>
        <li className="mb-1">Auto-scheduling of rounds based on candidate performance.</li>
        <li>Results are directly shared with the company after evaluation.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">3. AI-Powered Video & Audio Monitoring</h2>
      <ul className="list-disc pl-5 mb-6">
        <li className="mb-1"><strong>Face & Eye Tracking</strong> – Detects multiple people, gaze shifts, and looking away.</li>
        <li className="mb-1"><strong>Tab Switching Detection</strong> – Logs and warns candidates switching tabs.</li>
        <li className="mb-1"><strong>Full-Screen Enforcement</strong> – Auto-submits or warns if minimized.</li>
        <li className="mb-1"><strong>Multiple Monitor Detection</strong> – Blocks test if extra screens are detected.</li>
        <li><strong>Copy-Paste Restriction</strong> – Disables Ctrl+C / Ctrl+V.</li>
      </ul>

      <div className="my-5 flex items-center">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          className="w-4 h-4 mr-2"
        />
        <label htmlFor="agree" className="cursor-pointer">
          I have read and agree to the instructions.
        </label>
      </div>

      <button
        onClick={handleStartTest}
        disabled={!agreed}
        className={`px-5 py-2 text-white rounded ${agreed ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Start Test
      </button>
    </div>
  );
};
export default PracticeTests;