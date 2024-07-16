import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = ({ setIsAuth }) => {
  const { logIn, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

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

  const handleResetPassword = async () => {
    if (!email) {
      setError("נא להזין כתובת אימייל");
      return;
    }
    try {
      await resetPassword(email);
      setResetSent(true);
      setError("");
    } catch (error) {
      console.error(error);
      setError("שגיאה בשליחת בקשת איפוס סיסמה");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">התחברות מנהל</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">אימייל:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
                setResetSent(false);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">סיסמה:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition duration-200"
            />
          </div>
          {error && <p className="text-red-500 text-center font-medium">{error}</p>}
          {resetSent && (
            <p className="text-green-500 text-center font-medium">
              הוראות לאיפוס הסיסמה נשלחו לאימייל שלך
            </p>
          )}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 text-base font-medium transition duration-200 shadow-md">
              התחבר
            </button>
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-purple-600 hover:text-purple-700 focus:outline-none text-sm font-medium">
              שכחת סיסמה?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
