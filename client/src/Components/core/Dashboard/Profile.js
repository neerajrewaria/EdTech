import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import {
  FiSearch,
  FiBell,
  FiChevronDown,
  FiUser,
  FiPhone,
  FiCalendar,
  FiBookOpen,
  FiGrid,
  FiHeart,
  FiActivity,
  FiCreditCard,
} from "react-icons/fi";
import { FaGenderless } from "react-icons/fa";
import './Profile.css';

const ease = [0.16, 1, 0.3, 1];

const pageIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease, staggerChildren: 0.08 } }
};
const cardIn = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } }
};

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { user }  = useSelector((state) => state.profile);

  // ── 100% Preserved existing functional data extraction ──
  const firstname  = user?.firstname || "Learner";
  const lastname   = user?.lastname  || "";
  const about      = user?.about     || user?.additionalDetails?.about     || "";
  const dob        = user?.dob       || user?.additionalDetails?.dob       || "";
  const gender     = user?.gender    || user?.additionalDetails?.gender    || "";
  const contactNo  = user?.contactNo || user?.additionalDetails?.contactNo || "";
  const initialProfile = { about, dob, gender, contactNo };
  const formattedDOB   = dob && dob.includes("T") ? dob.split("T")[0] : dob;
  const fullName       = `${firstname} ${lastname}`.trim();
  const accountType    = user?.accountType || "Student";
  const email          = user?.email || "student@ncodex.com";

  const initials = firstname && lastname
    ? `${firstname[0]}${lastname[0]}`.toUpperCase()
    : firstname ? firstname[0].toUpperCase() : "NN";

  const enrolledCount  = user?.courses?.length || 0;
  const completedCount = user?.courseProgress?.length || 0;

  return (
    <div className="nx-workspace">
      <div className="nx-workspace-scroll">
        <AnimatePresence mode="wait">
          {!isEditing ? (
            <motion.div
              key="view"
              variants={pageIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            >
              {/* ── TOP BAR (Search + Bell + Profile Capsule) ── */}
              <div className="nx-topbar">
                <div className="nx-search-box">
                  <FiSearch className="nx-search-icon" />
                  <input type="text" placeholder="Search anything..." readOnly />
                </div>

                <div className="nx-topbar-actions">
                  <button type="button" className="nx-bell-btn" title="Notifications">
                    <FiBell />
                    <span className="nx-bell-badge">3</span>
                  </button>

                  <div className="nx-topbar-profile" onClick={() => setIsEditing(true)}>
                    <div className="nx-topbar-avatar">{initials}</div>
                    <div className="nx-topbar-userinfo">
                      <span className="nx-topbar-name">{fullName}</span>
                      <span className="nx-topbar-role">{accountType}</span>
                    </div>
                    <FiChevronDown className="nx-topbar-chevron" />
                  </div>
                </div>
              </div>

              {/* ── ROW 1: WELCOME BANNER CARD (Full Width) ── */}
              <motion.div className="nx-welcome-card" variants={cardIn}>
                {/* Background orbital graphic */}
                <svg className="nx-welcome-bg-orbit" viewBox="0 0 300 200" fill="none">
                  <ellipse cx="150" cy="100" rx="130" ry="70" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="4 4" />
                  <circle cx="240" cy="60" r="4" fill="#38bdf8" />
                  <circle cx="60" cy="140" r="3" fill="#818cf8" />
                </svg>

                <div className="nx-welcome-left">
                  <div className="nx-welcome-avatar-wrap">
                    <div className="nx-welcome-avatar">{initials}</div>
                    <span className="nx-welcome-avatar-dot" />
                  </div>

                  <div className="nx-welcome-info">
                    <span className="nx-welcome-greeting">Welcome back!</span>
                    <h1 className="nx-welcome-name">{fullName}</h1>
                    <span className="nx-welcome-email">{email}</span>
                    <div className="nx-welcome-role-badge">
                      <FiUser style={{ fontSize: '0.75rem' }} />
                      {accountType}
                    </div>
                  </div>
                </div>

                {/* Right Quote Box */}
                <div className="nx-welcome-quote-box">
                  <div className="nx-quote-icon">“</div>
                  <p className="nx-quote-text">
                    {accountType === "Instructor"
                      ? "Inspiring minds, shaping tomorrow. NCodeX with you every step."
                      : "Learning today, Leading tomorrow. NCodeX with you every step."}
                  </p>
                  <span className="nx-quote-sparkle">✨</span>
                </div>
              </motion.div>

              {/* ── ROW 2: SPLIT GRID (About You + Personal Information) ── */}
              <div className="nx-row2-grid">

                {/* Left Card: About You */}
                <motion.div className="nx-card" variants={cardIn}>
                  <div className="nx-card-header">
                    <div className="nx-card-title-group">
                      <div className="nx-card-icon-badge">
                        <FiUser />
                      </div>
                      <h3 className="nx-card-title">About You</h3>
                    </div>
                  </div>

                  <div className="nx-about-body">
                    <div className="nx-about-text-area">
                      <p className={`nx-about-bio ${about ? "has-bio" : ""}`}>
                        {about || "No biography added yet. Introduce yourself and tell the world about you."}
                      </p>

                      <button
                        type="button"
                        className="nx-card-action-btn"
                        style={{ width: 'fit-content' }}
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Biography
                      </button>
                    </div>

                    {/* Quill 3D Feather SVG Graphic */}
                    <svg className="nx-quill-vector" viewBox="0 0 120 120" fill="none">
                      <path
                        d="M90 20 C60 40, 30 80, 25 105 C24 107, 26 109, 28 108 C50 95, 80 60, 95 30 C97 26, 94 20, 90 20 Z"
                        fill="url(#quillGrad)"
                        opacity="0.85"
                      />
                      <path
                        d="M25 105 L15 115"
                        stroke="#818cf8"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <ellipse cx="15" cy="115" rx="10" ry="3" fill="#6366f1" opacity="0.3" />
                      <defs>
                        <linearGradient id="quillGrad" x1="20" y1="20" x2="100" y2="100">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </motion.div>

                {/* Right Card: Personal Information */}
                <motion.div className="nx-card" variants={cardIn}>
                  <div className="nx-card-header">
                    <div className="nx-card-title-group">
                      <div className="nx-card-icon-badge">
                        <FiCreditCard />
                      </div>
                      <h3 className="nx-card-title">Personal Information</h3>
                    </div>

                    <button
                      type="button"
                      className="nx-card-action-btn"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Details
                    </button>
                  </div>

                  {/* 2x2 Field Grid */}
                  <div className="nx-info-grid">

                    {/* Contact Number */}
                    <div className="nx-info-tile">
                      <span className="nx-tile-bar purple" />
                      <div className="nx-tile-icon">
                        <FiPhone />
                      </div>
                      <div className="nx-tile-content">
                        <span className="nx-tile-label">Contact Number</span>
                        <span className={`nx-tile-value ${!contactNo ? "empty" : ""}`}>
                          {contactNo || "—"}
                        </span>
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="nx-info-tile">
                      <span className="nx-tile-bar orange" />
                      <div className="nx-tile-icon">
                        <FiCalendar />
                      </div>
                      <div className="nx-tile-content">
                        <span className="nx-tile-label">Date of Birth</span>
                        <span className={`nx-tile-value ${!formattedDOB ? "empty" : ""}`}>
                          {formattedDOB || "—"}
                        </span>
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="nx-info-tile">
                      <span className="nx-tile-bar pink" />
                      <div className="nx-tile-icon">
                        <FaGenderless />
                      </div>
                      <div className="nx-tile-content">
                        <span className="nx-tile-label">Gender</span>
                        <span className={`nx-tile-value ${!gender ? "empty" : ""}`} style={{ textTransform: 'capitalize' }}>
                          {gender || "—"}
                        </span>
                      </div>
                    </div>

                    {/* Account Type */}
                    <div className="nx-info-tile">
                      <span className="nx-tile-bar sky" />
                      <div className="nx-tile-icon">
                        <FiUser />
                      </div>
                      <div className="nx-tile-content">
                        <span className="nx-tile-label">Account Type</span>
                        <span className="nx-tile-value">
                          {accountType}
                        </span>
                      </div>
                    </div>

                  </div>
                </motion.div>

              </div>

              {/* ── ROW 3: YOUR SNAPSHOT CARD (Full Width - Students Only) ── */}
              {accountType !== "Instructor" && (
                <motion.div className="nx-snapshot-card" variants={cardIn}>
                  <div className="nx-card-header" style={{ marginBottom: '20px' }}>
                    <div className="nx-card-title-group">
                      <div className="nx-card-icon-badge">
                        <FiActivity />
                      </div>
                      <h3 className="nx-card-title">Your Snapshot</h3>
                    </div>
                  </div>

                  <div className="nx-snapshot-body">
                    {/* 4 Metric Columns */}
                    <div className="nx-snapshot-metrics">

                      <div className="nx-metric-col">
                        <div className="nx-metric-head">
                          <FiBookOpen className="nx-metric-icon blue" />
                          <span className="nx-metric-title">Courses Enrolled</span>
                        </div>
                        <span className="nx-metric-count">{enrolledCount}</span>
                        <span className="nx-metric-sub">Keep learning!</span>
                      </div>

                      <div className="nx-metric-col">
                        <div className="nx-metric-head">
                          <FiGrid className="nx-metric-icon green" />
                          <span className="nx-metric-title">Modules Explored</span>
                        </div>
                        <span className="nx-metric-count">{completedCount}</span>
                        <span className="nx-metric-sub">Start exploring</span>
                      </div>

                      <div className="nx-metric-col">
                        <div className="nx-metric-head">
                          <FiHeart className="nx-metric-icon pink" />
                          <span className="nx-metric-title">Wishlist Items</span>
                        </div>
                        <span className="nx-metric-count">0</span>
                        <span className="nx-metric-sub">Your saved picks</span>
                      </div>

                      <div className="nx-metric-col">
                        <div className="nx-metric-head">
                          <FiActivity className="nx-metric-icon orange" />
                          <span className="nx-metric-title">Learning Streak</span>
                        </div>
                        <span className="nx-metric-count">0 days</span>
                        <span className="nx-metric-sub">Keep it going!</span>
                      </div>

                    </div>

                    {/* Far Right Trophy Box */}
                    <div className="nx-trophy-box">
                      {/* Trophy Illustration */}
                      <svg className="nx-trophy-img" viewBox="0 0 64 64" fill="none">
                        <path d="M16 12 H48 V28 C48 38 40 44 32 44 C24 44 16 38 16 28 Z" fill="url(#trophyGold)" />
                        <path d="M32 44 V52 M22 52 H42" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                        <path d="M16 16 H8 C8 24 16 26 16 26 M48 16 H56 C56 24 48 26 48 26" stroke="#fbbf24" strokeWidth="3" fill="none" />
                        <path d="M32 18 L34 24 L40 24 L35 28 L37 34 L32 30 L27 34 L29 28 L24 24 L30 24 Z" fill="#ffffff" opacity="0.9" />
                        <defs>
                          <linearGradient id="trophyGold" x1="16" y1="12" x2="48" y2="44">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#d97706" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <div className="nx-trophy-text-group">
                        <p className="nx-trophy-desc">
                          You're just getting started. Great things take time.
                        </p>
                        <span className="nx-trophy-highlight">Stay consistent!</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

            </motion.div>
          ) : (
            /* ── EDIT MODE (EditProfile — 100% functionality preserved) ── */
            <motion.div
              key="edit"
              className="nx-edit-shell"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            >
              <div className="nx-edit-head">
                <h2 className="nx-edit-title">Edit Profile</h2>
                <p className="nx-edit-sub">Update your biography and personal details.</p>
              </div>
              <EditProfile setIsEditing={setIsEditing} initialProfile={initialProfile} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Profile;