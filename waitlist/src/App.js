import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Home from './components/Home';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Context from './components/context/Context';

function App() {
  return (
    <div className="App">
      <Context>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </Context>
    </div>
  );
}

export default App;
