import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleCreateThread = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/threads/create");
    }
  };

  const handleUserClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <i className="fas fa-comments"></i>
        <span>ForumApp</span>
      </div>

      <div className="navbar-action">
        <button
          className="icon-btn"
          onClick={handleCreateThread}
          title={token ? "Create Thread" : "Login untuk membuat thread"}
        >
          <i className="fas fa-plus"></i>
        </button>

        <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
          <i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`} />
        </button>

        <button
          className="icon-btn"
          onClick={handleUserClick}
          title={token ? "Logout" : "Login"}
        >
          <i className="fas fa-user-circle"></i>
        </button>
      </div>
    </nav>
  );
}
