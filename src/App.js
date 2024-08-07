import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { Classes } from "./pages/Classes";
import { News } from "./pages/News";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { EventsContextProvider } from "./contexts/EventsContext";
import { NewsContextProvider } from "./contexts/NewsContext";
import { ClassesContextProvider } from "./contexts/ClassesContext";
import AboutUs from "./pages/AboutUs";
import { Help } from "./pages/Help";


function App() {
  return (
    <>
      <AuthContextProvider>
        <ClassesContextProvider>
        <NewsContextProvider>
        <EventsContextProvider>
          <Router>
            <Navbar />
            <Routes className="flex-grow">
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/newsAndUpdates" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/help" element={<Help />} />

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
        </EventsContextProvider>
        </NewsContextProvider>
        </ClassesContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
