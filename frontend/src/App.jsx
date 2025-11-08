import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ResumeAnalyzer from './pages/ResumeAnalyzer/ResumeAnalyzer';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardMain from './pages/Dashboard/DashboardMain';
import Chat from './pages/Chat/Chat';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function AppRoutes() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboardRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardMain />} />
          <Route path="resume" element={<ResumeAnalyzer />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;