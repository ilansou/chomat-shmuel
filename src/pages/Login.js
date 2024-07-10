import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = ({ setIsAuth }) => {
  const { logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("אימייל או סיסמה לא נכונים");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="bg-gray-50 rounded-2xl shadow-lg p-10 max-w-xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">התחברות מנהל</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium text-lg mb-2">אימייל:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition duration-200 text-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium text-lg mb-2">סיסמה:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition duration-200 text-md"
            />
          </div>
          {error && <p className="text-red-500 text-center font-medium">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg font-medium transition duration-200 shadow-md">
              התחבר
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
