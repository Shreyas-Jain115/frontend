import React from 'react';
import { signOut } from 'firebase/auth';
import { auth, database } from '../firebaseConfig'; // Adjust the path if needed
import { ref, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // ✅ Import your AuthContext hook

const LogoutButton = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // ✅ Get current user from AuthContext

  const handleLogout = async () => {
    if (!currentUser) return;

    try {
      const userId = currentUser.uid;

      // Remove user data from Realtime Database
      await remove(ref(database, 'students/' + userId));

      // Sign out the user
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed.");
    }
  };

  return (
    <button onClick={handleLogout}
      className="fixed top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-lg z-50"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
