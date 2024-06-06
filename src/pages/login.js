import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const Login = ({ setIsAuth }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            setError("Failed to login");
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center">
            <h1 className="text-3xl font-bold mb-8">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};
