import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { FiBookOpen, FiShoppingCart, FiVideo, FiLayers, FiMousePointer, FiPlay } from 'react-icons/fi';

const obysEase = [0.16, 1, 0.3, 1];

const journeySteps = [
  {
    id: 'step-1',
    num: 'STEP 01',
    title: 'Discover Job-Ready Tracks',
    description: 'Browse curated category catalogs across Web Development, Cloud Computing, DevOps, and Data Systems.',
    icon: <FiBookOpen />,
    stageTag: 'Category Catalog View',
    detailTitle: 'Full-Stack Web Architecture',
    detailSub: 'Master React, Node.js & Database Systems',
    statusBadge: 'Catalog Online'
  },
  {
    id: 'step-2',
    num: 'STEP 02',
    title: 'Inspect Detailed Syllabus',
    description: 'Review curriculum sections, lecture listings, instructor bios, and prerequisites before enrolling.',
    icon: <FiLayers />,
    stageTag: 'Curriculum Inspection',
    detailTitle: 'Section 03: REST & Database Engineering',
    detailSub: '12 Self-Paced Video Lectures Included',
    statusBadge: 'Syllabus Verified'
  },
  {
    id: 'step-3',
    num: 'STEP 03',
    title: 'Seamless Cart & Enrollment',
    description: 'Add target courses to your cart, execute secure checkout, and receive instant course access.',
    icon: <FiShoppingCart />,
    stageTag: 'Cart & Payment Engine',
    detailTitle: 'Order Summary & Enrollment',
    detailSub: 'Instant Access Unlocked Upon Purchase',
    statusBadge: 'Cart Ready'
  },
  {
    id: 'step-4',
    num: 'STEP 04',
    title: 'Self-Paced Video Stream',
    description: 'Watch video lectures in your learner dashboard anytime with automatically synchronized progress tracking.',
    icon: <FiVideo />,
    stageTag: 'Video Player Workspace',
    detailTitle: 'Lecture 04: Building Production REST APIs',
    detailSub: 'Progress Automatically Saved in Learner Profile',
    statusBadge: 'Stream Active'
  }
];

const InteractiveProductJourney = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // Auto-cycle through steps every 4.5 seconds to immediately demonstrate interactivity
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % journeySteps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const handleStepClick = (index) => {
    setIsAutoCycling(false); // User took control
    setActiveStepIndex(index);
  };

  const activeStep = journeySteps[activeStepIndex];

  return (
    <section className="ncodex-journey-section">
      <motion.div 
        style={{ textAlign: 'center', marginBottom: '48px' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: obysEase }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Interactive Product Walkthrough
        </span>
        <h2 className="nx-section-heading" style={{ marginTop: '4px' }}>
          How Learning <span className="nx-gradient-brand">Works On NCodeX</span>
        </h2>
        <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
          <FiMousePointer style={{ color: 'var(--accent)' }} /> Click any step card below to dynamically switch the workspace preview
        </span>
      </motion.div>

      <div className="journey-grid-container">
        {/* Left Side: Step Storytelling Cards with Active Indicators */}
        <div>
          {journeySteps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <motion.div
                key={step.id}
                className={`journey-step-card ${isActive ? 'active' : ''}`}
                onClick={() => handleStepClick(idx)}
                whileHover={{ x: 6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div
                    layoutId="journeyActiveBar"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      background: 'var(--primary)'
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span className="journey-step-num">{step.num}</span>

                  <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: '4px', background: isActive ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)', color: isActive ? 'var(--accent)' : 'var(--text-muted)', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {isActive ? <><FiPlay style={{ fontSize: '0.7rem' }} /> PREVIEWING</> : <><FiMousePointer style={{ fontSize: '0.7rem' }} /> CLICK TO PREVIEW</>}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                  {step.description}
                </p>

                {/* Auto-cycle progress line if active */}
                {isActive && isAutoCycling && (
                  <div style={{ height: '2px', background: 'var(--border)', marginTop: '14px', borderRadius: '1px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 4.5, ease: 'linear' }}
                      style={{ height: '100%', background: 'var(--accent)' }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right Side: Animated Product Interface Frame */}
        <div className="journey-app-frame">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: obysEase }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99,102,241,0.15)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                    {activeStep.icon}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-primary)' }}>{activeStep.stageTag}</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Authentic NCodeX Engine</span>
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--emerald)', background: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: '99px', border: '1px solid rgba(16,185,129,0.2)' }}>
                  {activeStep.statusBadge}
                </span>
              </div>

              <div style={{ background: 'var(--surface-elevated)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', display: 'block', marginBottom: '6px' }}>
                  Active Application View
                </span>
                <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading)', fontWeight: '700', marginBottom: '8px' }}>
                  {activeStep.detailTitle}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                  {activeStep.detailSub}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>✓ Instant Account Access</span>
                <Link to="/signup" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Start Flow <FaArrowRight style={{ fontSize: '0.8rem' }} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default InteractiveProductJourney;
