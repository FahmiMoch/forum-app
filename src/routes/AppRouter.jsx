import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import ThreadsPage from '../pages/ThreadsPage';
import ThreadDetailPage from '../pages/ThreadDetailPage';
import LoginPage from '../pages/LoginPage';           // ✅ tambahkan login
import RegisterPage from '../pages/RegisterPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const token = useSelector(state => state.auth.token);
  return token ? children : <Navigate to="/" replace />;
}

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />   {/* Navbar selalu tampil */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<ThreadsPage />} />           {/* Homepage selalu tampil */}
        <Route path="/threads" element={<ThreadsPage />} />
        <Route path="/threads/:threadId" element={<ThreadDetailPage />} />
        <Route path="/login" element={<LoginPage />} />       {/* Login muncul saat klik icon */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/leaderboard"
          element={<PrivateRoute><LeaderboardPage /></PrivateRoute>}
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
