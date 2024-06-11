import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";

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
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-tr from-green-200 to-green-700 p-8">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">התחברות מנהל</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">אימייל:</label>
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setError("");
                            }}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">סיסמה:</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setError("");
                            }}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                            התחבר
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
