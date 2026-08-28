import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { HiOutlineBookOpen, HiOutlinePlayCircle, HiOutlineSparkles } from 'react-icons/hi2';
import { FiCheck, FiChevronRight, FiCode, FiSend, FiZap } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: { 
    transition: { staggerChildren: 0.12, delayChildren: 0.1 } 
  }
};

const demoSteps = [
  { 
    label: 'Explore Catalog', 
    title: 'Select Job-Ready Engineering Tracks', 
    eyebrow: 'Step 01 / Discovery', 
    course: 'Cloud Native Systems Architecture', 
    detail: 'Modular learning with practical live environments', 
    accent: 'course' 
  },
  { 
    label: 'Interactive Lab', 
    title: 'Master Concepts in Real-Time IDE', 
    eyebrow: 'Step 02 / Practice', 
    course: 'Distributed Event Streaming with Kafka', 
    detail: '24/30 minutes | Live environment synced', 
    accent: 'lecture' 
  },
  { 
    label: 'Mentor Support', 
    title: 'Get Unstuck with Direct Guidance', 
    eyebrow: 'Step 03 / Mentorship', 
    course: 'How do we handle cache invalidation in cluster state?', 
    detail: 'Direct response from verified senior engineering mentors', 
    accent: 'question' 
  },
  { 
    label: 'Verified Skill', 
    title: 'Earn Verifiable Tech Credentials', 
    eyebrow: 'Step 04 / Certification', 
    course: 'Systems Architecture Master Certification', 
    detail: 'Blockchain verified & employer visible credential', 
    accent: 'answer' 
  },
];

const KineticHero = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % demoSteps.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const currentStep = demoSteps[activeStep];

  return (
    <section className="ncodex-kinetic-hero">
      <div className="hero-content-wrapper">
        
        {/* Left Column: Kinetic Text & Conversion CTAs */}
        <motion.div
          className="hero-text-block"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp}>
            <span className="hero-pill-tag">
              <span className="hero-pill-dot" />
              NCodeX Engineering Ecosystem
            </span>
          </motion.div>

          <div className="hero-title-box">
            <motion.h1 className="nx-title-hero" variants={fadeUp}>
              Master Real-World <br />
              <span className="nx-gradient-text">Software Systems.</span>
            </motion.h1>
          </div>

          <motion.p className="nx-subtitle" variants={fadeUp}>
            An advanced EdTech platform designed for aspiring engineers and top instructors. 
            Build production-grade applications, get real mentor support, and accelerate your engineering career.
          </motion.p>

          <motion.div className="hero-ctas-row" variants={fadeUp}>
            <Link to="/signup" className="nx-btn nx-btn-accent">
              <span>Start Learning Free</span>
              <FaArrowRight />
            </Link>
            
            <a href="#curriculum" className="nx-btn nx-btn-secondary">
              <FiZap />
              <span>Explore Curriculum</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive Product Console */}
        <motion.div
          className="hero-visual-block"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div 
            className="hero-demo-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="demo-mac-bar">
              <div className="mac-dots">
                <span className="mac-dot red" />
                <span className="mac-dot yellow" />
                <span className="mac-dot green" />
              </div>
              <div className="demo-title-tab">
                <FiCode />
                <span>NCodeX Live Engine v2.4</span>
              </div>
              <span className="demo-live-badge">System Ready</span>
            </div>

            <div className="demo-stage-screen" key={currentStep.eyebrow}>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--nx-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {currentStep.eyebrow}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', marginTop: '4px' }}>
                  {currentStep.title}
                </h3>
              </div>

              <div className="demo-card-box active-card">
                {currentStep.accent === 'course' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(0,240,255,0.1)', color: 'var(--nx-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                      <HiOutlineBookOpen />
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block', fontSize: '0.98rem', fontWeight: '600' }}>{currentStep.course}</strong>
                      <small style={{ color: 'var(--nx-text-muted)', fontSize: '0.82rem' }}>{currentStep.detail}</small>
                    </div>
                    <FiChevronRight style={{ color: 'var(--nx-cyan)' }} />
                  </div>
                )}

                {currentStep.accent === 'lecture' && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <HiOutlinePlayCircle style={{ color: 'var(--nx-cyan)', fontSize: '1.4rem' }} />
                      <strong style={{ fontSize: '0.95rem' }}>{currentStep.course}</strong>
                    </div>
                    <div style={{ height: '6px', background: 'var(--nx-surface-3)', borderRadius: '3px', overflow: 'hidden', margin: '10px 0' }}>
                      <div style={{ width: '75%', height: '100%', background: 'var(--nx-gradient-accent)' }} />
                    </div>
                    <small style={{ color: 'var(--nx-text-muted)', fontSize: '0.8rem' }}>{currentStep.detail}</small>
                  </div>
                )}

                {currentStep.accent === 'question' && (
                  <div>
                    <p style={{ fontSize: '0.92rem', color: 'var(--nx-text)', marginBottom: '10px' }}>
                      "{currentStep.course}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', fontSize: '0.8rem', color: 'var(--nx-cyan)' }}>
                      <span>Connected with Mentor</span>
                      <FiSend />
                    </div>
                  </div>
                )}

                {currentStep.accent === 'answer' && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <HiOutlineSparkles style={{ color: 'var(--nx-emerald)', fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--nx-text)' }}>{currentStep.course}</strong>
                      <small style={{ color: 'var(--nx-emerald)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.82rem' }}>
                        <FiCheck /> {currentStep.detail}
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="demo-step-nav">
              {demoSteps.map((stepItem, idx) => (
                <button
                  type="button"
                  key={stepItem.label}
                  className={`demo-step-btn ${idx === activeStep ? 'is-active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  0{idx + 1} {stepItem.label.split(' ')[0]}
                </button>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default KineticHero;
