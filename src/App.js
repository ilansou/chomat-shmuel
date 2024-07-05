import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { Classes } from "./pages/Classes";
import { NewsAndUpdates } from "./pages/NewsAndUpdates";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import { AuthContextProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Navbar />
          <Routes className="flex-grow">
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/newsAndUpdates" element={<NewsAndUpdates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
