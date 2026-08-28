import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { FiBookOpen, FiZap, FiArrowUpRight } from 'react-icons/fi';
import { getAllCourses } from '../../../services/operations/courseDetailsAPI';

const UnifiedHero = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        if (res && res.length > 0) {
          setCourses(res);
        }
      } catch (e) {
        // fallback handles empty
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="ncodex-hero-unified">
      <div className="hero-grid-container">
        
        {/* Left Column: Heading, Subtext & Action CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero-pill-badge">
            <FiZap /> The Premier Tech Education Platform
          </span>

          <h1 className="nx-heading-hero">
            Master Job-Ready <br />
            <span className="nx-gradient-brand">Software Skills.</span>
          </h1>

          <p className="hero-subtext">
            NCodeX bridges the gap between learning concepts and building production apps. Explore expert-curated courses, enroll seamlessly, or build and teach your own curriculum.
          </p>

          <div className="hero-ctas-group">
            <Link to="/signup" className="nx-btn nx-btn-primary">
              <span>Start Learning Free</span>
              <FaArrowRight />
            </Link>

            <a href="#courses-marquee" className="nx-btn nx-btn-secondary">
              <span>Explore Catalog</span>
              <FiArrowUpRight />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Multi-Layered Visual Composition with Floating Physics */}
        <motion.div 
          className="hero-layered-stage"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Base Layer Card */}
          <div className="hero-card-base">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  <FiBookOpen />
                </div>
                <div>
                  <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-primary)' }}>NCodeX Learning Engine</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Interactive Self-Paced Experience</span>
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--emerald)', background: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: '99px', border: '1px solid rgba(16,185,129,0.2)' }}>
                System Ready
              </span>
            </div>

            <div style={{ background: 'var(--surface-elevated)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', gap: '12px', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>Active Lesson</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>65% Complete</span>
              </div>
              <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
                {courses.length > 0 ? courses[0].courseName : "Full-Stack Web Architecture"}
              </strong>
              <div style={{ height: '6px', background: 'var(--background)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: 'var(--gradient-brand-text)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span>✓ Video Lectures Included</span>
              <span>✓ Lifetime Course Access</span>
            </div>
          </div>

          {/* Floating Physics Layer */}
          <motion.div 
            className="hero-card-floating"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiZap />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-primary)' }}>Job-Ready Skills</strong>
              <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Learn at your pace</small>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default UnifiedHero;
