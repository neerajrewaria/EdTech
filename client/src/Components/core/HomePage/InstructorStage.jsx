import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGlobe, FaUsers, FaLaptopCode } from 'react-icons/fa6';
import instructorImg from '../../../assests/Images/office.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const InstructorStage = () => {
  return (
    <section className="ncodex-instructor-stage">
      <div className="stage-wrapper">
        
        {/* Visual Media Column */}
        <motion.div
          className="stage-image-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <img 
            src={instructorImg} 
            alt="Become an Instructor with NCodeX" 
          />
          <div className="stage-floating-tag">
            <span style={{ fontSize: '1.4rem' }}>🚀</span>
            <div>
              <strong style={{ display: 'block', fontSize: '0.92rem' }}>Empower Tech Talent</strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--nx-text-muted)' }}>Global Educator Network</span>
            </div>
          </div>
        </motion.div>

        {/* Content Column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nx-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <FaGlobe style={{ display: 'inline', marginRight: '6px' }} />
            For Educators & Mentors
          </span>

          <h2 className="nx-section-title" style={{ marginTop: '8px', marginBottom: '20px' }}>
            Become an <span className="nx-gradient-text">Instructor</span> on NCodeX
          </h2>

          <p className="nx-subtitle" style={{ marginBottom: '32px' }}>
            Share your specialized engineering knowledge with learners around the world. We provide the tools, course structure, and interactive lab environments so you can teach with confidence.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '36px' }}>
            <div style={{ padding: '16px', background: 'var(--nx-surface-2)', borderRadius: '16px', border: '1px solid var(--nx-border)' }}>
              <FaUsers style={{ color: 'var(--nx-cyan)', fontSize: '1.2rem', marginBottom: '8px' }} />
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>Global Reach</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--nx-text-muted)' }}>Inspire students worldwide</span>
            </div>

            <div style={{ padding: '16px', background: 'var(--nx-surface-2)', borderRadius: '16px', border: '1px solid var(--nx-border)' }}>
              <FaLaptopCode style={{ color: 'var(--nx-purple)', fontSize: '1.2rem', marginBottom: '8px' }} />
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>Interactive IDE</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--nx-text-muted)' }}>Built-in testing tools</span>
            </div>
          </div>

          <Link to="/signup" className="nx-btn nx-btn-primary">
            <span>Start Teaching Today</span>
            <FaArrowRight />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default InstructorStage;
