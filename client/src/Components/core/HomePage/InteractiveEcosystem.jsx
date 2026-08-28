import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaLaptopCode, FaChalkboardUser, FaCheck } from 'react-icons/fa6';
import { FiBookOpen, FiShoppingCart } from 'react-icons/fi';
import instructorImg from '../../../assests/Images/office.jpg';

const obysEase = [0.16, 1, 0.3, 1];

const InteractiveEcosystem = () => {
  const [activeTab, setActiveTab] = useState('student');

  return (
    <section className="ncodex-ecosystem-section">
      <motion.div 
        style={{ textAlign: 'center', marginBottom: '32px' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: obysEase }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Platform Architecture
        </span>
        <h2 className="nx-section-heading" style={{ marginTop: '4px' }}>
          Designed For <span className="nx-gradient-brand">Students & Educators</span>
        </h2>
      </motion.div>

      {/* Tab Switcher */}
      <div className="ecosystem-toggle-tabs">
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`tab-pill ${activeTab === 'student' ? 'active' : ''}`}
          onClick={() => setActiveTab('student')}
        >
          <FaLaptopCode style={{ display: 'inline', marginRight: '8px' }} />
          Student Learning Journey
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`tab-pill ${activeTab === 'instructor' ? 'active' : ''}`}
          onClick={() => setActiveTab('instructor')}
        >
          <FaChalkboardUser style={{ display: 'inline', marginRight: '8px' }} />
          Instructor Studio Flow
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'student' ? (
          <motion.div
            key="student-stage"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: obysEase }}
            className="ecosystem-stage-grid"
          >
            <div>
              <span className="tag-pill-mono" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                For Learners
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '700', margin: '12px 0 16px', lineHeight: '1.2' }}>
                Discover, Enroll, & Build Skills
              </h3>
              <p style={{ fontSize: '1.05rem', marginBottom: '28px', lineHeight: '1.6' }}>
                Explore structured courses across web development, cloud computing, and computer science. Add courses to your cart, complete your purchase, and stream video lectures anytime from your learner dashboard.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <FaCheck style={{ color: 'var(--emerald)' }} /> Browse Curated Category Catalogs
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <FaCheck style={{ color: 'var(--emerald)' }} /> Integrated Shopping Cart & Instant Access
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <FaCheck style={{ color: 'var(--emerald)' }} /> Self-Paced Video Lectures & Saved Progress
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link to="/signup" className="nx-btn nx-btn-primary">
                  <span>Start Learning Free</span>
                  <FaArrowRight />
                </Link>
              </motion.div>
            </div>

            <motion.div 
              className="ecosystem-card-visual"
              whileHover={{ borderColor: 'rgba(99, 102, 241, 0.35)' }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <FiBookOpen style={{ color: 'var(--primary)', fontSize: '1.6rem' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '1rem' }}>Student Experience Stack</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Explore → Cart → Learn</span>
                </div>
              </div>

              <div style={{ background: 'var(--surface-elevated)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '10px', fontWeight: '600' }}>
                  <FiShoppingCart /> Integrated Checkout & Enrollment Flow
                </div>
                <p style={{ fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                  Seamlessly add courses to cart, complete payment processing, and immediately unlock video lectures in your dashboard.
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="instructor-stage"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: obysEase }}
            className="ecosystem-stage-grid"
          >
            <div>
              <span className="tag-pill-mono" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                For Instructors
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '700', margin: '12px 0 16px', lineHeight: '1.2' }}>
                Build & Publish Your Own Courses
              </h3>
              <p style={{ fontSize: '1.05rem', marginBottom: '28px', lineHeight: '1.6' }}>
                Share your expertise with learners worldwide. NCodeX provides an intuitive course creation studio where you can build curriculum sections, upload video lectures, and publish complete courses.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <FaCheck style={{ color: 'var(--primary)' }} /> Step-by-Step Course Creator Studio
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <FaCheck style={{ color: 'var(--primary)' }} /> Modular Section & Video Lesson Uploader
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <FaCheck style={{ color: 'var(--primary)' }} /> Full Course Management & Editing Tools
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link to="/signup" className="nx-btn nx-btn-primary">
                  <span>Become an Instructor</span>
                  <FaArrowRight />
                </Link>
              </motion.div>
            </div>

            <motion.div 
              className="ecosystem-card-visual" 
              style={{ padding: 0, overflow: 'hidden' }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src={instructorImg} 
                alt="Instructor Course Creator Experience" 
                style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InteractiveEcosystem;
