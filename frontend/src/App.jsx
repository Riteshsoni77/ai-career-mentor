import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
//import SettingsPage from './pages/Settings/SettingsPage';
import ResumeAnalyzer from './pages/ResumeAnalyzer/ResumeAnalyzer';
import Dashborard from './pages/Dashboard/Dashborard';
import DashboardMain from './pages/Dashboard/DashboardMain';
import Chat from './pages/Chat/Chat';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Nested routes for dashboard */}
        <Route path="/Dashborard/*" element={<Dashborard />}>
          <Route index element={<DashboardMain />} />
          /* <Route path="resume" element={<ResumeAnalyzer />} /> 
          <Route path="chat" element={<Chat />} />
          {/* <Route path="settings" element={<SettingsPage />} />  */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;