import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { FiCheck } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const FinalCTA = () => {
  return (
    <section className="ncodex-final-cta">
      <motion.div 
        className="final-cta-box"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nx-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Take The Next Step
        </span>

        <h2 className="final-cta-title">
          Ready to Transform Your <br />
          <span className="nx-gradient-text">Engineering Future?</span>
        </h2>

        <p className="nx-subtitle" style={{ margin: '0 auto' }}>
          Join learners and mentors on NCodeX building the next generation of software talent and production-ready applications.
        </p>

        <div className="final-cta-buttons">
          <Link to="/signup" className="nx-btn nx-btn-accent" style={{ padding: '18px 40px', fontSize: '1.05rem' }}>
            <span>Start Learning Free</span>
            <FaArrowRight />
          </Link>

          <Link to="/signup" className="nx-btn nx-btn-secondary" style={{ padding: '18px 40px', fontSize: '1.05rem' }}>
            <span>Become an Instructor</span>
          </Link>
        </div>

        <div style={{ marginTop: '28px', color: 'var(--nx-text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <FiCheck style={{ color: 'var(--nx-emerald)' }} /> No credit card required to start
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
