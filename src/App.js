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
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
    return (
        <>
            <AuthContextProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/classes" element={<Classes />} />
                        <Route path="/newsAndUpdates" element={<NewsAndUpdates />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                    <Footer />
                </Router>
            </AuthContextProvider>
        </>
    );
}

export default App;
