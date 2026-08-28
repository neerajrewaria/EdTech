import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { FiCheck } from 'react-icons/fi';

const LaunchStageCTA = () => {
  return (
    <section className="ncodex-launch-stage">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nx-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Act V — Get Started Today
        </span>

        <h2 className="launch-stage-title">
          JOIN THE NCODEX <br />
          <span style={{ color: 'var(--nx-cyan)' }}>LEARNING ECOSYSTEM.</span>
        </h2>

        <p className="launch-stage-subtitle">
          Start your learning journey or share your knowledge as an instructor on NCodeX.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link to="/signup" className="nx-pill-btn nx-pill-btn-primary" style={{ padding: '20px 48px', fontSize: '1.1rem' }}>
            <span>Start Learning Free</span>
            <FaArrowRight />
          </Link>

          <Link to="/signup" className="nx-pill-btn nx-pill-btn-outline" style={{ padding: '20px 48px', fontSize: '1.1rem' }}>
            <span>Become an Instructor</span>
          </Link>
        </div>

        <div style={{ marginTop: '32px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nx-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <FiCheck style={{ color: 'var(--nx-emerald)' }} /> Instant Account Setup
        </div>
      </motion.div>
    </section>
  );
};

export default LaunchStageCTA;
