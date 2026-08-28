import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight, FiMessageCircle, FiClock, FiCode, FiCpu, FiTrendingUp, FiLock } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const LearningSystem = () => {
  const [progress] = useState(() => Math.floor(Math.random() * 15) + 82);

  return (
    <section className="ncodex-learning-system">
      <div className="system-container">
        
        <div style={{ textCenter: 'center', textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nx-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <HiOutlineSparkles style={{ display: 'inline', marginRight: '6px' }} />
            The NCodeX Methodology
          </span>
          <h2 className="nx-section-title" style={{ marginTop: '8px' }}>
            Built For High-Velocity <span className="nx-gradient-text">Skill Mastery</span>
          </h2>
          <p className="nx-subtitle" style={{ margin: '16px auto 0' }}>
            A deliberate three-stage learning architecture designed to eliminate friction between learning a concept and shipping it.
          </p>
        </div>

        {/* Step 01 */}
        <motion.div 
          className="system-step-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="system-step-text">
            <div className="system-step-number">01</div>
            <h3 className="system-step-title">Select & Enroll in Curated Tracks</h3>
            <p className="system-step-desc">
              Structured roadmaps designed by industry practitioners. From frontend architecture to cloud native infrastructure, start learning with real-world project context.
            </p>
            <Link to="/signup" className="nx-btn nx-btn-secondary">
              <span>Browse All Tracks</span>
              <FiArrowRight />
            </Link>
          </div>

          <div className="system-step-preview">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: 'var(--nx-surface-1)', borderRadius: '12px', border: '1px solid var(--nx-border)' }}>
                <FiCode style={{ color: 'var(--nx-cyan)', fontSize: '1.4rem' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.92rem' }}>Advanced React Hooks & Architecture</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--nx-text-muted)' }}>Interactive Labs & Sandbox</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: 'var(--nx-surface-1)', borderRadius: '12px', border: '1px solid var(--nx-border)' }}>
                <FiCpu style={{ color: 'var(--nx-purple)', fontSize: '1.4rem' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.92rem' }}>Distributed Systems & Kafka Pipelines</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--nx-text-muted)' }}>Event Streaming Architecture</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: 'var(--nx-surface-1)', borderRadius: '12px', border: '1px solid var(--nx-border)' }}>
                <FiTrendingUp style={{ color: 'var(--nx-emerald)', fontSize: '1.4rem' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.92rem' }}>Applied Machine Learning in Production</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--nx-text-muted)' }}>Model Deployment & Ops</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 02 */}
        <motion.div 
          className="system-step-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="system-step-text">
            <div className="system-step-number">02</div>
            <h3 className="system-step-title">Direct Mentor Support & Code Review</h3>
            <p className="system-step-desc">
              Never get stuck on bugs or theoretical roadblocks. Get precise feedback and architectural code reviews from experienced tech mentors.
            </p>
            <Link to="/contact" className="nx-btn nx-btn-secondary">
              <FiMessageCircle />
              <span>Ask a Mentor</span>
            </Link>
          </div>

          <div className="system-step-preview">
            <div style={{ background: 'var(--nx-surface-1)', borderRadius: '16px', padding: '20px', border: '1px solid var(--nx-border)' }}>
              <div style={{ marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid var(--nx-border)' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--nx-cyan)' }}>Student Question</span>
                <p style={{ fontSize: '0.92rem', color: 'var(--nx-text)', marginTop: '4px', fontWeight: '500' }}>
                  "How do we handle cache consistency across replica nodes during high-write loads?"
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--nx-gradient-accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem' }}>
                  MN
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ fontSize: '0.88rem' }}>Senior Staff Mentor</strong>
                    <FiCheckCircle style={{ color: 'var(--nx-cyan)', fontSize: '0.85rem' }} />
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--nx-text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>
                    Use an invalidation bus combined with TTL-backed write-through caching. This guarantees replica synchronization under burst traffic.
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--nx-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                    <FiClock /> Replied in 12 mins
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 03 */}
        <motion.div 
          className="system-step-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="system-step-text">
            <div className="system-step-number">03</div>
            <h3 className="system-step-title">Track Milestones & Claim Credentials</h3>
            <p className="system-step-desc">
              Watch your progress stack up in real-time. Complete capstones to earn verifiable credentials that demonstrate your skills to technical recruiters.
            </p>
            <Link to="/signup" className="nx-btn nx-btn-accent">
              <span>Start Your Journey</span>
              <FiArrowRight />
            </Link>
          </div>

          <div className="system-step-preview">
            <div style={{ background: 'var(--nx-surface-1)', borderRadius: '16px', padding: '24px', border: '1px solid var(--nx-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--nx-text-secondary)' }}>Track Progress</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: '700', color: 'var(--nx-cyan)' }}>{progress}%</span>
              </div>

              <div style={{ height: '8px', background: 'var(--nx-surface-3)', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'var(--nx-gradient-primary)' }} />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '6px 12px', background: 'rgba(16,185,129,0.1)', color: 'var(--nx-emerald)', borderRadius: '99px', border: '1px solid rgba(16,185,129,0.2)' }}>
                  ✓ System Architecture
                </span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '6px 12px', background: 'rgba(0,240,255,0.1)', color: 'var(--nx-cyan)', borderRadius: '99px', border: '1px solid rgba(0,240,255,0.2)' }}>
                  ✓ Live Capstone
                </span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '6px 12px', background: 'rgba(139,92,246,0.1)', color: 'var(--nx-purple)', borderRadius: '99px', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <FiLock style={{ display: 'inline', marginRight: '4px' }} /> Certified
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default LearningSystem;
