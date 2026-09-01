import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FaReact, FaNodeJs, FaPython, FaDocker, FaLaptopCode, FaChalkboardUser } from "react-icons/fa6"
import { FiZap, FiBookOpen, FiShoppingCart, FiVideo, FiLayers, FiCheckCircle } from "react-icons/fi"

import LoginForm from "../../../pages/LoginForm.js"
import SignupForm from "../../../pages/SignupForm.js"
import AuthFlowThread from "./AuthFlowThread"
import { ACCOUNT_TYPE } from "../../../utils/constants"

import "./Template.css"

const obysEase = [0.16, 1, 0.3, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const lineVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 0.85, ease: obysEase },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: obysEase },
  },
}

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)
  const isSignup = formType === "signup"

  // Active role state shared for dynamic narrative responsiveness
  const [activeRole, setActiveRole] = useState(ACCOUNT_TYPE.STUDENT)

  const isInstructor = isSignup && activeRole === ACCOUNT_TYPE.INSTRUCTOR

  return (
    <div className="template-container">
      {/* Signature SVG Flowing Thread Background */}
      <AuthFlowThread />

      {loading ? (
        <div className="spinner-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <div className="spinner" />
        </div>
      ) : (
        <div className="template-content">
          
          {/* Left Column: Role-Adaptive Narrative & Feature Stage */}
          <motion.div
            className="template-hero-narrative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUpVariants}>
              <span className="template-badge">
                <FiZap />{" "}
                {isSignup
                  ? isInstructor
                    ? "NCodeX Gateway // Instructor Studio"
                    : "NCodeX Gateway // Student Portal"
                  : "NCodeX Gateway // Workspace Portal"}
              </span>
            </motion.div>

            <div style={{ marginBottom: "12px" }}>
              <div className="nx-line-mask">
                <motion.h1 className="template-title" variants={lineVariants} key={isSignup ? (isInstructor ? "inst1" : "stud1") : "login1"}>
                  {isSignup
                    ? isInstructor
                      ? "Share Your Technical"
                      : "Build Your Next"
                    : "Return To Your"}
                </motion.h1>
              </div>
              <div className="nx-line-mask">
                <motion.h1 className="template-title nx-gradient-brand" variants={lineVariants} key={isSignup ? (isInstructor ? "inst2" : "stud2") : "login2"}>
                  {isSignup
                    ? isInstructor
                      ? "Expertise."
                      : "Chapter."
                    : "Workspace."}
                </motion.h1>
              </div>
            </div>

            <motion.div variants={fadeUpVariants}>
              <p className="template-description">
                {isSignup
                  ? isInstructor
                    ? "Build and publish structured technical courses on NCodeX. Create section syllabi, upload video lessons, and manage your students."
                    : "Join ambitious engineers mastering real production stacks. Discover category tracks, stream video lectures, and build job-ready skills."
                  : "Welcome back. Access your saved course progress, continue video playback, or manage your instructor studio dashboard."}
              </p>
            </motion.div>

            {/* Dynamic Feature Benefits (3 Authentic Platform Points) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isSignup ? (isInstructor ? "inst-features" : "stud-features") : "login-features"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '26px' }}
              >
                {isSignup ? (
                  isInstructor ? (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                        <FaChalkboardUser style={{ color: 'var(--primary)' }} /> <span>Build modular section syllabi & upload video lectures</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                        <FiLayers style={{ color: 'var(--accent)' }} /> <span>Publish courses directly to NCodeX category catalog</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                        <FiCheckCircle style={{ color: 'var(--emerald)' }} /> <span>Manage course content & grow educational presence</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                        <FiBookOpen style={{ color: 'var(--accent)' }} /> <span>Explore curated learning paths & course categories</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                        <FiShoppingCart style={{ color: 'var(--accent)' }} /> <span>Instant cart checkout & video lecture streaming</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                        <FiVideo style={{ color: 'var(--accent)' }} /> <span>Synchronized learner progress & dashboard tracking</span>
                      </div>
                    </>
                  )
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                      <FiBookOpen style={{ color: 'var(--accent)' }} /> <span>Access your enrolled courses & section syllabi</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                      <FiVideo style={{ color: 'var(--accent)' }} /> <span>Resume video lecture playback where you left off</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                      <FaLaptopCode style={{ color: 'var(--accent)' }} /> <span>Synchronized learner dashboard & instructor tools</span>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Supported Technology Stack Pills */}
            <motion.div variants={fadeUpVariants} style={{ paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
                LEARNING & CREATOR PLATFORM STACKS
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <div className="hero-tech-pill" title="React Frontend">
                  <FaReact style={{ color: '#61dafb', fontSize: '0.95rem' }} /> <span>React</span>
                </div>
                <div className="hero-tech-pill" title="Node.js Backend">
                  <FaNodeJs style={{ color: '#68a063', fontSize: '0.95rem' }} /> <span>Node.js</span>
                </div>
                <div className="hero-tech-pill" title="Python Systems">
                  <FaPython style={{ color: '#3776ab', fontSize: '0.95rem' }} /> <span>Python</span>
                </div>
                <div className="hero-tech-pill" title="DevOps Cloud">
                  <FaDocker style={{ color: '#2496ed', fontSize: '0.95rem' }} /> <span>DevOps</span>
                </div>
                <div className="hero-tech-pill" title="Student Flow">
                  <FaLaptopCode style={{ color: 'var(--accent)', fontSize: '0.95rem' }} /> <span>Student</span>
                </div>
                <div className="hero-tech-pill" title="Instructor Studio">
                  <FaChalkboardUser style={{ color: 'var(--primary)', fontSize: '0.95rem' }} /> <span>Teaching</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Integrated Glass Auth Panel */}
          <motion.div
            className="template-form-card"
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: obysEase }}
          >
            {/* Route Tab Switcher */}
            <div className="auth-route-tabs">
              <Link
                to="/login"
                className={`auth-route-tab ${!isSignup ? "active" : ""}`}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={`auth-route-tab ${isSignup ? "active" : ""}`}
              >
                Create Account
              </Link>
            </div>

            {/* Render Active Form Component */}
            {isSignup ? (
              <SignupForm activeRole={activeRole} setActiveRole={setActiveRole} />
            ) : (
              <LoginForm />
            )}
          </motion.div>

        </div>
      )}
    </div>
  )
}

export default Template
