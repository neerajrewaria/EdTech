import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaLaptopCode, FaChalkboardUser, FaCheck } from 'react-icons/fa6';
import { FiBookOpen } from 'react-icons/fi';
import instructorImg from '../../../assests/Images/office.jpg';

const EcosystemSplit = () => {
  const [activePersona, setActivePersona] = useState('student');

  return (
    <section className="ncodex-ecosystem-split">
      <div className="ecosystem-container">
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nx-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Act III / Two Sides of One Platform
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', fontWeight: '800', marginTop: '8px', textTransform: 'uppercase' }}>
            The Dual <span style={{ color: 'var(--nx-cyan)' }}>Learning Ecosystem</span>
          </h2>
        </div>

        {/* Persona Switcher Toggle Bar */}
        <div className="persona-toggle-bar">
          <button
            type="button"
            className={`persona-toggle-btn ${activePersona === 'student' ? 'is-active' : ''}`}
            onClick={() => setActivePersona('student')}
          >
            <FaLaptopCode style={{ display: 'inline', marginRight: '8px' }} />
            For Students & Learners
          </button>

          <button
            type="button"
            className={`persona-toggle-btn ${activePersona === 'instructor' ? 'is-active' : ''}`}
            onClick={() => setActivePersona('instructor')}
          >
            <FaChalkboardUser style={{ display: 'inline', marginRight: '8px' }} />
            For Instructors & Creators
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activePersona === 'student' ? (
            <motion.div
              key="student-panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="persona-display-grid"
            >
              <div className="persona-content-box">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nx-cyan)', textTransform: 'uppercase' }}>
                  Student Journey // Learn & Succeed
                </span>
                <h3>Discover, Enroll, & Learn at Your Own Pace</h3>
                <p>
                  Browse structured course catalogs, view complete syllabi, add courses to your cart, and access your video lectures anytime from your personalized learner dashboard.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                    <FaCheck style={{ color: 'var(--nx-emerald)' }} /> Explore Curated Course Categories & Tracks
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                    <FaCheck style={{ color: 'var(--nx-emerald)' }} /> Seamless Cart & Course Enrollment
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                    <FaCheck style={{ color: 'var(--nx-emerald)' }} /> Self-Paced Video Learning & Progress Tracking
                  </div>
                </div>

                <Link to="/signup" className="nx-pill-btn nx-pill-btn-primary">
                  <span>Start Learning Free</span>
                  <FaArrowRight />
                </Link>
              </div>

              <div className="persona-preview-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <FiBookOpen style={{ color: 'var(--nx-cyan)', fontSize: '1.8rem' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem' }}>Student Experience Flow</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--nx-text-muted)', fontFamily: 'var(--font-mono)' }}>Discover → Enroll → Learn</span>
                  </div>
                </div>

                <div style={{ background: 'var(--nx-bg)', padding: '20px', borderRadius: '8px', border: '1px solid var(--nx-border)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  <div style={{ color: 'var(--nx-cyan)' }}>1. Browse Category Catalog</div>
                  <div style={{ color: 'var(--nx-text)', marginTop: '8px' }}>2. Inspect Course Syllabus & Details</div>
                  <div style={{ color: 'var(--nx-emerald)', marginTop: '4px' }}>3. Add to Cart & Complete Checkout</div>
                  <div style={{ color: 'var(--nx-text-muted)', marginTop: '4px' }}>4. Access Video Lectures in Dashboard</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="instructor-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="persona-display-grid"
            >
              <div className="persona-content-box">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nx-cyan)', textTransform: 'uppercase' }}>
                  Instructor Journey // Teach & Share
                </span>
                <h3>Build & Publish Courses with Ease</h3>
                <p>
                  Create comprehensive courses, structure curriculum into modular sections, upload video lectures, and manage your published content directly through the instructor studio.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                    <FaCheck style={{ color: 'var(--nx-cyan)' }} /> Intuitive Course Creation Studio
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                    <FaCheck style={{ color: 'var(--nx-cyan)' }} /> Modular Section & Video Lecture Builder
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                    <FaCheck style={{ color: 'var(--nx-cyan)' }} /> Complete Course Management & Publishing
                  </div>
                </div>

                <Link to="/signup" className="nx-pill-btn nx-pill-btn-primary">
                  <span>Become an Instructor</span>
                  <FaArrowRight />
                </Link>
              </div>

              <div className="persona-preview-box" style={{ padding: 0, overflow: 'hidden' }}>
                <img 
                  src={instructorImg} 
                  alt="NCodeX Instructor Experience" 
                  style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default EcosystemSplit;
