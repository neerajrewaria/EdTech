import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { FiCheck } from 'react-icons/fi';

const ClosingStage = () => {
  return (
    <section className="ncodex-closing-stage">
      <motion.div
        className="closing-cta-box"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Start Your Journey Today
        </span>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: '800', margin: '16px 0 20px', lineHeight: '1.1' }}>
          Ready to Elevate Your <br />
          <span className="nx-gradient-brand">Technical Expertise?</span>
        </h2>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 36px', lineHeight: '1.6' }}>
          Join thousands of learners and instructors building, teaching, and advancing their careers on NCodeX.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/signup" className="nx-btn nx-btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
            <span>Start Learning Free</span>
            <FaArrowRight />
          </Link>

          <Link to="/signup" className="nx-btn nx-btn-secondary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
            <span>Become an Instructor</span>
          </Link>
        </div>

        <div style={{ marginTop: '28px', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <FiCheck style={{ color: 'var(--emerald)' }} /> Instant Free Account Setup
        </div>
      </motion.div>
    </section>
  );
};

export default ClosingStage;
