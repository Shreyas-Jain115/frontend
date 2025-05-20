import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    if (!email) return alert("Please enter your email to reset your password.");

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      console.error("Error sending reset email:", error);
      setMessage("Failed to send reset email. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden px-4">
      <div className="absolute inset-0 border-2 border-purple-600 opacity-30 animate-spin-slow pointer-events-none" />
      <div className="bg-black border border-purple-600 text-white shadow-lg rounded-xl p-6 w-full max-w-md z-10">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>

        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none"
          />

          <button
            onClick={handlePasswordReset}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 transition text-white py-2 rounded-md"
          >
            {loading ? "Sending..." : "Send Password Reset Email"}
          </button>

          {message && (
            <div className="mt-4 text-center text-sm text-blue-400">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
