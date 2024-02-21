import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Logup from "./pages/Logup/LogupPageCV"; 
import Login from "./pages/Login/LoginPageCV"; 
import CV from "./pages/CVMP/CVPageMain"; 

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/">
                <Route index element={<Login/>}/>
                <Route path="login" element={<Login />} />
                <Route path="logup" element={<Logup />} />
                <Route path="CV" element={<CV/>} />
            </Route>
        </Routes>
    </Router>
  );
}

export default App;
