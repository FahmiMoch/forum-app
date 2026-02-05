import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
import ThreadsPage from '../pages/ThreadsPage';
import ThreadDetailPage from '../pages/ThreadDetailPage';
import CreateThreadPage from '../pages/CreateThreadPage'; // 🔥 TAMBAH
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ================= PROTECTED ================= */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ThreadsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/threads"
          element={
            <ProtectedRoute>
              <ThreadsPage />
            </ProtectedRoute>
          }
        />

        {/* 🔥 CREATE THREAD (HARUS DI ATAS) */}
        <Route
          path="/threads/create"
          element={
            <ProtectedRoute>
              <CreateThreadPage />
            </ProtectedRoute>
          }
        />

        {/* DETAIL THREAD */}
        <Route
          path="/threads/:threadId"
          element={
            <ProtectedRoute>
              <ThreadDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
