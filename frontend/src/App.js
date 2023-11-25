import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginpage from "./Components/Loginpage";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Loginpage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
