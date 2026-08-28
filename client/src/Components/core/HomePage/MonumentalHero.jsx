import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlay } from 'react-icons/fa6';
import { FiBookOpen, FiUser, FiZap, FiCheckCircle } from 'react-icons/fi';

const MonumentalHero = () => {
  const [activeTab, setActiveTab] = useState('catalog');

  return (
    <section className="ncodex-monumental-hero">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-top-tag">
            <FiZap /> NCodeX EdTech Platform
          </span>
        </motion.div>

        <motion.h1 
          className="hero-giant-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          MASTER TECH SKILLS. <br />
          <span style={{ color: 'var(--nx-cyan)' }}>BUILD YOUR CAREER.</span>
        </motion.h1>
      </div>

      <motion.div 
        className="hero-editorial-split"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        <p className="hero-lead-paragraph">
          NCodeX is a full-scale EdTech platform connecting passionate learners with expert instructors. Discover job-ready courses, learn at your own pace, or build and publish your own curriculum.
        </p>

        <div className="hero-action-buttons">
          <Link to="/signup" className="nx-pill-btn nx-pill-btn-primary">
            <span>Start Learning Free</span>
            <FaArrowRight />
          </Link>

          <a href="#spotlight" className="nx-pill-btn nx-pill-btn-outline">
            <span>Explore Courses</span>
          </a>
        </div>
      </motion.div>

      {/* Interactive Preview of Real NCodeX Application Interface */}
      <motion.div 
        className="hero-terminal-window"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="terminal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--nx-cyan)' }}>
              <FiBookOpen /> Platform Workspace
            </span>
            <button 
              type="button"
              onClick={() => setActiveTab('catalog')}
              style={{ background: 'transparent', border: 'none', color: activeTab === 'catalog' ? 'var(--nx-cyan)' : 'var(--nx-text-muted)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
            >
              Course Catalog
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('player')}
              style={{ background: 'transparent', border: 'none', color: activeTab === 'player' ? 'var(--nx-cyan)' : 'var(--nx-text-muted)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
            >
              Lecture Experience
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('dashboard')}
              style={{ background: 'transparent', border: 'none', color: activeTab === 'dashboard' ? 'var(--nx-cyan)' : 'var(--nx-text-muted)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
            >
              Learner Dashboard
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--nx-emerald)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            <FiCheckCircle /> System Active
          </div>
        </div>

        <div className="terminal-body">
          {activeTab === 'catalog' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'var(--nx-surface-alt)', padding: '16px', borderRadius: '8px', border: '1px solid var(--nx-border)' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--nx-cyan)' }}>Web Development</span>
                <h4 style={{ fontSize: '1rem', marginTop: '4px', marginBottom: '8px' }}>Full-Stack Web Engineering</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--nx-text-secondary)', margin: 0 }}>Master React, Node.js & Database Architecture</p>
              </div>
              <div style={{ background: 'var(--nx-surface-alt)', padding: '16px', borderRadius: '8px', border: '1px solid var(--nx-border)' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--nx-purple)' }}>Cloud & DevOps</span>
                <h4 style={{ fontSize: '1rem', marginTop: '4px', marginBottom: '8px' }}>Cloud Systems & Architecture</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--nx-text-secondary)', margin: 0 }}>Deploy resilient microservices & container pipelines</p>
              </div>
            </div>
          )}

          {activeTab === 'player' && (
            <div style={{ background: 'var(--nx-surface-alt)', padding: '20px', borderRadius: '8px', border: '1px solid var(--nx-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <FaPlay style={{ color: 'var(--nx-cyan)', fontSize: '1.2rem' }} />
                <div>
                  <strong style={{ fontSize: '0.95rem' }}>Lecture 04: Building Scalable REST APIs</strong>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--nx-text-muted)' }}>Self-Paced Video Lesson | Progress Saved</span>
                </div>
              </div>
              <div style={{ height: '6px', background: 'var(--nx-bg)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: 'var(--nx-cyan)' }} />
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--nx-surface-alt)', padding: '16px 20px', borderRadius: '8px', border: '1px solid var(--nx-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiUser style={{ color: 'var(--nx-cyan)', fontSize: '1.4rem' }} />
                <div>
                  <strong style={{ fontSize: '0.95rem', display: 'block' }}>Student Profile & Enrolled Courses</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--nx-text-muted)' }}>Access all enrolled learning materials anytime</span>
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--nx-emerald)' }}>Active Enrollee</span>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default MonumentalHero;
