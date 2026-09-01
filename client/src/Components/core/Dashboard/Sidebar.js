import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../../services/operations/authAPI";
import {
  HiOutlineUser,
  HiOutlineAcademicCap,
  HiOutlineHeart,
  HiOutlineClock,
  HiOutlineViewGrid,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
  HiOutlineLogout,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineBookOpen,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { FiCode } from "react-icons/fi";
import './Sidebar.css';

function Sidebar({ activePage, setActivePage }) {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { user }  = useSelector((state) => state.profile);
  const [isLight, setIsLight] = useState(false);

  const isInstructor = user?.accountType === "Instructor";

  // Synchronize theme with DOM & Navbar
  useEffect(() => {
    const syncTheme = () => {
      try {
        const saved = localStorage.getItem('theme_home');
        const isLightActive = saved === 'light' || document.documentElement.classList.contains('light');
        setIsLight(isLightActive);
      } catch (e) {}
    };

    syncTheme();

    const handleCustomEvent = (e) => {
      if (e?.detail !== undefined) {
        setIsLight(Boolean(e.detail));
      } else {
        syncTheme();
      }
    };

    window.addEventListener('ncodex_theme_change', handleCustomEvent);
    window.addEventListener('storage', syncTheme);
    return () => {
      window.removeEventListener('ncodex_theme_change', handleCustomEvent);
      window.removeEventListener('storage', syncTheme);
    };
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    try {
      if (next) {
        document.documentElement.classList.add('light');
        document.body.classList.add('light');
        localStorage.setItem('theme_home', 'light');
      } else {
        document.documentElement.classList.remove('light');
        document.body.classList.remove('light');
        localStorage.setItem('theme_home', 'dark');
      }
      window.dispatchEvent(new CustomEvent('ncodex_theme_change', { detail: next }));
    } catch (e) {}
  };

  const handleNav = (page) => {
    if (page === "logout") {
      dispatch(logout());
      navigate("/login");
      return;
    }
    if (page === "courses") {
      navigate("/");
      return;
    }
    setActivePage(page);
  };

  const studentNav = [
    { id: "enrolledCourses", icon: HiOutlineAcademicCap, label: "Enrolled Courses" },
    { id: "wishlist",        icon: HiOutlineHeart,       label: "Wishlist"         },
    { id: "purchaseHistory", icon: HiOutlineClock,       label: "Purchase History" },
    { id: "courses",         icon: HiOutlineViewGrid,    label: "Explore Modules"  },
  ];

  const instructorNav = [
    { id: "myCourses", icon: HiOutlineBookOpen,   label: "My Courses" },
    { id: "addCourse", icon: HiOutlinePlusCircle, label: "Add Course" },
  ];

  const currentNav = isInstructor ? instructorNav : studentNav;

  return (
    <aside className="nx-sidebar">
      {/* ── Brand Logo Header Capsule ── */}
      <div className="nx-sidebar-brand">
        <div className="nx-brand-gem">
          <FiCode />
        </div>
        <div className="nx-brand-text">
          <span className="nx-brand-title">NCodeX</span>
          <span className="nx-brand-sub">{isInstructor ? "INSTRUCTOR STUDIO" : "STUDENT WORKSPACE"}</span>
        </div>
      </div>

      {/* ── Nav Links Core ── */}
      <nav className="nx-nav-core">
        {/* Overview / Profile */}
        <button
          type="button"
          className={`nx-nav-item ${activePage === "profile" ? "nx-active" : ""}`}
          onClick={() => handleNav("profile")}
        >
          <HiOutlineUser className="nx-nav-icon" />
          <span className="nx-nav-label">Overview</span>
        </button>

        {/* Section: Dynamic by Role */}
        <span className="nx-nav-section-label">{isInstructor ? "STUDIO" : "LEARN"}</span>
        {currentNav.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nx-nav-item ${activePage === item.id ? "nx-active" : ""}`}
            onClick={() => handleNav(item.id)}
          >
            <item.icon className="nx-nav-icon" />
            <span className="nx-nav-label">{item.label}</span>
          </button>
        ))}

        {/* Section: PREFERENCES */}
        <span className="nx-nav-section-label">PREFERENCES</span>

        <button
          type="button"
          className={`nx-nav-item ${activePage === "settings" ? "nx-active" : ""}`}
          onClick={() => handleNav("settings")}
        >
          <HiOutlineCog className="nx-nav-icon" />
          <span className="nx-nav-label">Settings</span>
        </button>

        <button
          type="button"
          className="nx-nav-item"
          onClick={() => navigate("/contact")}
        >
          <HiOutlineQuestionMarkCircle className="nx-nav-icon" />
          <span className="nx-nav-label">Help & Support</span>
        </button>

        <button
          type="button"
          className="nx-nav-item nx-logout"
          onClick={() => handleNav("logout")}
        >
          <HiOutlineLogout className="nx-nav-icon" />
          <span className="nx-nav-label">Sign Out</span>
        </button>
      </nav>

      {/* ── Ambient Graphic SVG ── */}
      <svg className="nx-sidebar-bg-vector" viewBox="0 0 200 200" fill="none">
        <path
          d="M-20 180 C40 120, 80 190, 160 110 C200 70, 180 20, 220 0"
          stroke="url(#sidebarGrad)"
          strokeWidth="2.5"
        />
        <defs>
          <linearGradient id="sidebarGrad" x1="0" y1="0" x2="200" y2="200">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Theme Switcher Card ── */}
      <div className="nx-sidebar-dock">
        <div className="nx-theme-card">
          <div className="nx-theme-info">
            {isLight ? (
              <HiOutlineSun className="nx-theme-icon" style={{ color: '#f59e0b' }} />
            ) : (
              <HiOutlineMoon className="nx-theme-icon" style={{ color: '#818cf8' }} />
            )}
            <div className="nx-theme-text-group">
              <span className="nx-theme-label">Theme</span>
              <span className="nx-theme-val">{isLight ? "Light Mode" : "Dark Mode"}</span>
            </div>
          </div>

          <button
            type="button"
            className={`nx-toggle-switch ${isLight ? "" : "is-active"}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="nx-toggle-knob" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;