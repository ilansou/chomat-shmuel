import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Events } from "./pages/events";
import { Classes } from "./pages/classes";
import { NewsAndUpdates } from "./pages/newsAndUpdates";
import { Contact } from "./pages/contact";
import { Login } from "./pages/login";
import { About } from "./pages/about";
import { AuthContextProvider } from "./context/AuthContext";
import { Navbar } from "./components/navbar";
import { Newsletter } from "./components/newsletter";


function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes className="flex-grow">
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/newsAndUpdates" element={<NewsAndUpdates />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Newsletter />
          </div>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
