import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} caseSensitive />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
