import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import FooterPage from "../pages/FooterPage";

import ThreadsPage from "../pages/ThreadsPage";
import ThreadDetailPage from "../pages/ThreadDetailPage";
import CreateThreadPage from "../pages/CreateThreadPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LeaderboardPage from "../pages/LeaderboardPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Router>
      {/* ===== NAVBAR (SELALU TAMPIL) ===== */}
      <Navbar />

      {/* ===== CONTENT ===== */}
      <Routes>
        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<ThreadsPage />} />
        <Route path="/threads/:threadId" element={<ThreadDetailPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        {/* ===== AUTH ===== */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ===== LOGIN ONLY ===== */}
        <Route
          path="/threads/create"
          element={
            <ProtectedRoute>
              <CreateThreadPage />
            </ProtectedRoute>
          }
        />

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ===== FOOTER (SELALU TAMPIL) ===== */}
      <FooterPage />
    </Router>
  );
}
