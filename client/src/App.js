import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import Register from './pages/register'
// import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Use 'element' prop here */}
          <Route path="/register" element={<Register />} /> {/* Use 'element' prop here */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> Use 'element' prop here */}
        </Routes>
      </Router>
    </div>
  )
}
export default App