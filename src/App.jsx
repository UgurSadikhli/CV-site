import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Logup from "./pages/Logup/LogupPageCV";
import Login from "./pages/Login/LoginPageCV";
import CV from "./pages/CVMP/CVPageMain";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Login onLogin={handleLogin} />} />
          <Route path="login" element={<Login onLogin={handleLogin} />} />
          <Route path="logup" element={<Logup />} />
          <Route
            path="CV"
            element={
              isAuthenticated ? (
                <CV onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
