import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlay, FaReact, FaNodeJs, FaPython, FaJs, FaDocker, FaLaptopCode, FaChalkboardUser } from 'react-icons/fa6';
import { FiBookOpen, FiZap, FiCheckCircle, FiArrowUpRight, FiClock, FiVideo, FiLayers } from 'react-icons/fi';
import { getAllCourses } from '../../../services/operations/courseDetailsAPI';

const obysEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.85, ease: obysEase },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: obysEase },
  },
};

const UnifiedHero = () => {
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('catalog');
  const [isPlaying, setIsPlaying] = useState(true);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 70]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.9]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        if (res && res.length > 0) {
          setCourses(res);
        }
      } catch (e) {
        // fallback
      }
    };
    fetchCourses();
  }, []);

  const handleMouseMove = (e) => {
    const heroElem = document.querySelector('.ncodex-hero-unified');
    if (!heroElem) return;
    const rect = heroElem.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroElem.style.setProperty('--mouse-x', `${x}px`);
    heroElem.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="ncodex-hero-unified" onMouseMove={handleMouseMove}>
      <div className="hero-ambient-glow" />

      <motion.div 
        className="hero-grid-container"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        
        {/* Left Column: Line-by-Line Kinetic Clip-Path Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUpVariants}>
            <span className="hero-pill-badge">
              <FiZap /> The Premier Tech Education Platform
            </span>
          </motion.div>

          <div style={{ marginBottom: '16px' }}>
            <div className="nx-line-mask">
              <motion.h1 className="nx-heading-hero" variants={lineVariants}>
                Master Job-Ready
              </motion.h1>
            </div>
            <div className="nx-line-mask">
              <motion.h1 className="nx-heading-hero nx-gradient-brand" variants={lineVariants}>
                Software Skills.
              </motion.h1>
            </div>
          </div>

          <motion.div variants={fadeUpVariants}>
            <p className="hero-subtext">
              NCodeX bridges the gap between learning concepts and building production apps. Discover job-ready courses, stream video lectures at your pace, or publish your own curriculum.
            </p>
          </motion.div>

          <motion.div className="hero-ctas-group" variants={fadeUpVariants}>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link to="/signup" className="nx-btn nx-btn-primary">
                <span>Start Learning Free</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FaArrowRight />
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <a href="#courses-marquee" className="nx-btn nx-btn-secondary">
                <span>Explore Catalog</span>
                <FiArrowUpRight />
              </a>
            </motion.div>
          </motion.div>

          {/* Tech Stack & Learning/Teaching Strip */}
          <motion.div variants={fadeUpVariants} style={{ marginTop: '36px', paddingTop: '22px', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
              TEACH & LEARN MODERN TECH STACKS
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <motion.div className="hero-tech-pill" whileHover={{ y: -3, scale: 1.03 }} title="Web & Frontend Engineering">
                <FaReact style={{ color: '#61dafb', fontSize: '1.2rem' }} /> <span>React</span>
              </motion.div>
              <motion.div className="hero-tech-pill" whileHover={{ y: -3, scale: 1.03 }} title="Node.js & Backend Architecture">
                <FaNodeJs style={{ color: '#68a063', fontSize: '1.2rem' }} /> <span>Node.js</span>
              </motion.div>
              <motion.div className="hero-tech-pill" whileHover={{ y: -3, scale: 1.03 }} title="Python & Data Science">
                <FaPython style={{ color: '#3776ab', fontSize: '1.2rem' }} /> <span>Python</span>
              </motion.div>
              <motion.div className="hero-tech-pill" whileHover={{ y: -3, scale: 1.03 }} title="JavaScript Systems">
                <FaJs style={{ color: '#f7df1e', fontSize: '1.2rem' }} /> <span>JavaScript</span>
              </motion.div>
              <motion.div className="hero-tech-pill" whileHover={{ y: -3, scale: 1.03 }} title="Cloud & Microservices">
                <FaDocker style={{ color: '#2496ed', fontSize: '1.2rem' }} /> <span>DevOps</span>
              </motion.div>
              <motion.div className="hero-tech-pill" whileHover={{ y: -3, scale: 1.03 }} title="Interactive Student Learning">
                <FaLaptopCode style={{ color: 'var(--accent)', fontSize: '1.2rem' }} /> <span>Student</span>
              </motion.div>
              <motion.div className="hero-tech-pill" whileHover={{ y: -3, scale: 1.03 }} title="Instructor Creator Studio">
                <FaChalkboardUser style={{ color: 'var(--primary)', fontSize: '1.2rem' }} /> <span>Teaching</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive Animated Workspace Simulation */}
        <motion.div 
          className="hero-layered-stage"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: obysEase }}
        >
          {/* Base Layer Card */}
          <motion.div 
            className="hero-card-base"
            whileHover={{ borderColor: 'rgba(99, 102, 241, 0.4)' }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  <FiBookOpen />
                </div>
                <div>
                  <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-primary)' }}>NCodeX Workspace</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Live Interactive Platform Preview</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('catalog')}
                  style={{ padding: '5px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: activeTab === 'catalog' ? 'var(--primary)' : 'transparent', color: activeTab === 'catalog' ? '#fff' : 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <FiLayers /> Track
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('player')}
                  style={{ padding: '5px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: activeTab === 'player' ? 'var(--primary)' : 'transparent', color: activeTab === 'player' ? '#fff' : 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <FiVideo /> Lecture
                </button>
              </div>
            </div>

            {activeTab === 'catalog' ? (
              <motion.div 
                key="catalog-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: 'var(--surface-elevated)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border)', marginBottom: '16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>Active Enrolled Course</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--emerald)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <FiCheckCircle /> 72% Complete
                  </span>
                </div>
                <strong style={{ display: 'block', fontSize: '1.02rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
                  {courses.length > 0 ? courses[0].courseName : "Full-Stack Web Architecture Track"}
                </strong>
                <div style={{ height: '6px', background: 'var(--background)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '72%' }}
                    transition={{ duration: 1.2, ease: obysEase }}
                    style={{ height: '100%', background: 'var(--gradient-brand-text)' }} 
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="player-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: 'var(--surface-elevated)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border)', marginBottom: '16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <FaPlay style={{ fontSize: '0.8rem', marginLeft: isPlaying ? '0' : '2px' }} />
                    </button>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'block' }}>Lecture 04: REST & Database Architecture</strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Self-Paced Video Stream</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                    <FiClock style={{ display: 'inline', marginRight: '4px' }} /> 18:42
                  </span>
                </div>
                <div style={{ height: '6px', background: 'var(--background)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div 
                    animate={{ width: isPlaying ? ['35%', '65%', '35%'] : '50%' }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    style={{ height: '100%', background: 'var(--accent)' }}
                  />
                </div>
              </motion.div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span>✓ Video Lectures Streamed</span>
              <span>✓ Lifetime Progress Access</span>
            </div>
          </motion.div>

          {/* Floating Physics Layer */}
          <motion.div 
            className="hero-card-floating"
            animate={{ y: [0, -14, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiZap />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-primary)' }}>Job-Ready Skills</strong>
              <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Self-paced learning</small>
            </div>
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
};

export default UnifiedHero;
