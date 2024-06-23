import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-purple-100 to-purple-100 p-2">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">התחברות מנהל</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold text-lg">אימייל:</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setError("");
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold text-lg">סיסמה:</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setError("");
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-purple-500 text-white py-3 rounded-md hover:from-purple-600 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg">
                            התחבר
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
