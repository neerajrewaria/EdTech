import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCode,
  FiCpu,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight,
  FiClock,
  FiUsers,
  FiMessageCircle,
  FiThumbsUp,
  FiThumbsDown,
  FiShield,
  FiLock,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { BsRocketTakeoff } from "react-icons/bs";
import "./Learningjourney.css";

/* ------------------------------------------------------------------
   Step 1 — course highlights shown as enroll rows.
   Swap for a real "trending courses" API call later; the row
   markup below reads only from this array.
------------------------------------------------------------------ */
const enrollHighlights = [
  {
    id: "react-hooks",
    icon: <FiCode />,
    accent: "magenta",
    name: "Advanced React Hooks",
    students: "2.4k enrolled",
    badge: "Popular",
  },
  {
    id: "applied-ml",
    icon: <FiCpu />,
    accent: "cyan",
    name: "Applied Machine Learning",
    students: "1.1k enrolled",
  },
  {
    id: "modern-data-science",
    icon: <FiTrendingUp />,
    accent: "lime",
    name: "Modern Data Science",
    students: "980 enrolled",
  },
];

/* Step 2 — a real instructor reply thread, no automation implied */
const supportThread = {
  studentQuestion:
    "How does the useEffect dependency array work in this hook?",
  instructorName: "Prof. Meera Nair",
  instructorInitials: "MN",
  instructorRole: "React & Frontend Mentor",
  responseTime: "Replied in 12 min",
  reply:
    "The dependency array tells React when to re-run the effect. An empty array runs it once on mount; adding variables re-runs it whenever those values change.",
};

/* Step 3 — skills already picked up on the (illustrative) sample path */
const masteredSkills = [
  { label: "React Mastered", accent: "lime", icon: <FiCheckCircle /> },
  { label: "API Integration", accent: "cyan", icon: <FiCheckCircle /> },
  { label: "Authentication", accent: "violet", icon: <FiLock /> },
];
const extraSkillsCount = 3;

const cardReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 16, mass: 1 },
  },
};

const parentReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.6,
      delayChildren: 0.08,
    },
  },
};

const LearningJourney = () => {
  /* Homepage has no logged-in course-progress context, so this is a
     representative number, randomized once per page load — it stays
     stable for the rest of the visit instead of re-rolling on every
     re-render. Swap for real user progress once available here. */
  const [progress] = useState(() => Math.floor(Math.random() * 21) + 75); // 75–95%

  return (
    <section className="lj-section">
      <div className="lj-container">
        {/* ---------- Header (unchanged) ---------- */}
        <div className="lj-header">
          <span className="lj-eyebrow">
            <HiOutlineSparkles />
            Your Roadmap
          </span>
          <h2 className="lj-heading">
            Accelerate Your <span className="lj-heading-accent">Tech Career</span>
          </h2>
          <p className="lj-subheading">
            Three steps stand between you and your next role — enroll, get
            unstuck instantly, and watch verifiable progress stack up.
          </p>
        </div>

        {/* ---------- Bento grid ---------- */}
        <motion.div className="lj-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={parentReveal}>
          {/* Step 1 — Choose & Enroll */}
          <motion.div className="lj-card lj-card--enroll" variants={cardReveal}>
            <div className="lj-card-top">
              <div className="lj-card-heading-row">
                <span className="lj-step-index">01</span>
                <div>
                  <h3 className="lj-card-title">Choose &amp; Enroll</h3>
                  <p className="lj-card-desc">
                    Discover expert-led courses in AI, Web Dev, and Data
                    Science.
                  </p>
                </div>
              </div>
              <Link to="/courses" className="lj-outline-btn">
                Explore Courses <FiArrowRight />
              </Link>
            </div>

            <ul className="lj-enroll-list">
              {enrollHighlights.map((course) => (
                <li
                  className={`lj-enroll-row lj-enroll-row--${course.accent}`}
                  key={course.id}
                >
                  <span className="lj-enroll-row-icon">{course.icon}</span>
                  <span className="lj-enroll-row-meta">
                    <span className="lj-enroll-row-name">{course.name}</span>
                    <span className="lj-enroll-row-students">
                      <FiUsers /> {course.students}
                    </span>
                  </span>
                  {course.badge && (
                    <span className="lj-enroll-badge-pill">{course.badge}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Step 2 — Instructor Support */}
          <motion.div className="lj-card lj-card--mentor" variants={cardReveal}>
            <div className="lj-card-top">
              <div className="lj-card-heading-row">
                <span className="lj-step-index">02</span>
                <div>
                  <h3 className="lj-card-title">Instructor Support</h3>
                  <p className="lj-card-desc">
                    Real instructors, fast replies — never stuck for long.
                  </p>
                </div>
              </div>
              <Link to="/ask" className="lj-outline-btn">
                <FiMessageCircle /> Ask a Question
              </Link>
            </div>

            <div className="lj-thread-box">
              <div className="lj-thread-question-block">
                <span className="lj-thread-question-label">You asked</span>
                <p>{supportThread.studentQuestion}</p>
              </div>

              <div className="lj-thread-divider" />

              <div className="lj-thread-reply">
                <span className="lj-avatar-circle" aria-hidden="true">
                  <span className="lj-avatar-initials">
                    {supportThread.instructorInitials}
                  </span>
                  <span className="lj-verified-badge">
                    <FiCheckCircle />
                  </span>
                </span>
                <div className="lj-thread-reply-body">
                  <div className="lj-thread-reply-meta">
                    <span className="lj-thread-name">
                      {supportThread.instructorName}
                    </span>
                    <span className="lj-thread-role">
                      {supportThread.instructorRole}
                    </span>
                  </div>
                  <p>{supportThread.reply}</p>
                </div>
              </div>

              <div className="lj-thread-divider" />

              <div className="lj-thread-footer">
                <span className="lj-thread-time">
                  <FiClock /> {supportThread.responseTime}
                </span>
                <span className="lj-thread-helpful">
                  Helpful?
                  <button type="button" className="lj-helpful-btn" aria-label="Mark helpful">
                    <FiThumbsUp />
                  </button>
                  <button type="button" className="lj-helpful-btn" aria-label="Mark not helpful">
                    <FiThumbsDown />
                  </button>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Step 3 — Master Future-Ready Skills */}
          <motion.div className="lj-card lj-card--track" variants={cardReveal}>
            <div className="lj-card-heading-row">
              <span className="lj-step-index">03</span>
              <div>
                <h3 className="lj-card-title">Master Future-Ready Skills</h3>
                <p className="lj-card-desc">
                  Track your learning journey, build production-ready
                  skills, and accelerate your career with verified
                  milestones.
                </p>
              </div>
            </div>

            <div className="lj-track-layout">
              <div className="lj-track-content">
                <div className="lj-progress-box">
                  <div className="lj-progress-top">
                    <div>
                      <span className="lj-progress-value">{progress}%</span>
                      <span className="lj-progress-caption">
                        Course Completion
                      </span>
                    </div>
                    <span className="lj-progress-next">
                      Next: Final Capstone
                    </span>
                  </div>

                  <div className="lj-progress-track">
                    <div
                      className="lj-progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="lj-skill-row">
                    {masteredSkills.map((skill) => (
                      <span
                        className={`lj-skill-chip lj-skill-chip--${skill.accent}`}
                        key={skill.label}
                      >
                        {skill.icon}
                        {skill.label}
                      </span>
                    ))}
                    {extraSkillsCount > 0 && (
                      <span className="lj-skill-chip lj-skill-chip--more">
                        +{extraSkillsCount} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="lj-track-cta">
                <div className="lj-rocket-wrap" aria-hidden="true">
                  <span className="lj-rocket-cloud lj-rocket-cloud--left" />
                  <span className="lj-rocket-cloud lj-rocket-cloud--right" />
                  <span className="lj-rocket-sparkle lj-rocket-sparkle--1" />
                  <span className="lj-rocket-sparkle lj-rocket-sparkle--2" />
                  <span className="lj-rocket-circle">
                    <span className="lj-rocket-pulse" />
                    <BsRocketTakeoff />
                  </span>
                </div>

                <p className="lj-track-cta-copy">
                  Ready to see your own progress bar fill up?
                </p>

                <Link to="/signup" className="lj-enroll-btn">
                  <span>Start Learning Free</span>
                  <FiArrowRight />
                </Link>

                <span className="lj-cta-note">
                  <FiShield /> No credit card required
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningJourney;