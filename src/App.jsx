import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route 
          path="/*" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;