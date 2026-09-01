import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaLaptopCode, FaChalkboardUser, FaCheck } from 'react-icons/fa6';
import { FiBookOpen, FiShoppingCart, FiVideo, FiLayers, FiZap, FiArrowUpRight } from 'react-icons/fi';
import Footer from '../Components/Common/Footer';
import './AboutPage.css';

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

const AboutPage = () => {
  return (
    <div className="about-page-root">
      
      {/* SECTION 1: EDITORIAL HERO */}
      <section className="about-hero-section">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUpVariants}>
            <span className="about-pill-tag">
              <FiZap /> Authentic Product Mission
            </span>
          </motion.div>

          <div style={{ marginBottom: '16px' }}>
            <div className="nx-line-mask">
              <motion.h1 className="about-hero-title" variants={lineVariants}>
                One Platform.
              </motion.h1>
            </div>
            <div className="nx-line-mask">
              <motion.h1 className="about-hero-title nx-gradient-brand" variants={lineVariants}>
                Two Sides Of Learning.
              </motion.h1>
            </div>
          </div>

          <motion.div variants={fadeUpVariants}>
            <p className="about-hero-sub">
              NCodeX is built to connect ambitious learners with structured, job-ready technical courses, while empowering educators with comprehensive tools to build, manage, and publish educational content.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: THE PRODUCT STORY */}
      <section className="about-story-section">
        <motion.div 
          className="about-story-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: obysEase }}
        >
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Product Purpose
            </span>
            <h2 className="nx-section-heading" style={{ margin: '12px 0 16px' }}>
              Built For <span className="nx-gradient-brand">Real Technical Competence</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Generic video tutorials often leave developers stuck between basic tutorials and production realities. NCodeX structures learning into clean category tracks, detailed section syllabi, integrated shopping cart checkout, and self-paced video streaming.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <FaCheck style={{ color: 'var(--emerald)' }} /> Sequential Section Syllabi & Video Lessons
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <FaCheck style={{ color: 'var(--emerald)' }} /> Seamless Cart Checkout & Immediate Course Unlocking
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <FaCheck style={{ color: 'var(--emerald)' }} /> Learner Dashboard Progress Tracking
              </div>
            </div>
          </div>

          <div className="about-story-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(99,102,241,0.15)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                <FiBookOpen />
              </div>
              <div>
                <strong style={{ fontSize: '1rem', display: 'block' }}>The NCodeX Workflow</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Discover → Enroll → Learn</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'var(--surface-elevated)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>01. EXPLORE CATALOG</span>
                <strong style={{ display: 'block', fontSize: '0.95rem', marginTop: '2px' }}>Browse Category Tracks & Syllabi</strong>
              </div>
              <div style={{ background: 'var(--surface-elevated)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>02. SHOPPING CART</span>
                <strong style={{ display: 'block', fontSize: '0.95rem', marginTop: '2px' }}>Secure Instant Account Access</strong>
              </div>
              <div style={{ background: 'var(--surface-elevated)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>03. SELF-PACED LEARNING</span>
                <strong style={{ display: 'block', fontSize: '0.95rem', marginTop: '2px' }}>Stream Video Lectures in Dashboard</strong>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: TWO SIDES OF NCODEX */}
      <section className="about-ecosystem-section">
        <motion.div 
          style={{ textAlign: 'center', marginBottom: '48px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: obysEase }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Dual Persona Architecture
          </span>
          <h2 className="nx-section-heading" style={{ marginTop: '4px' }}>
            Designed For Both <span className="nx-gradient-brand">Learners & Educators</span>
          </h2>
        </motion.div>

        <div className="about-persona-grid">
          {/* Student Persona */}
          <motion.div 
            className="about-persona-card"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(56,189,248,0.12)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '20px', border: '1px solid rgba(56,189,248,0.25)' }}>
              <FaLaptopCode />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              LEARNER ECOSYSTEM
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', margin: '8px 0 14px' }}>
              Discover & Stream Courses
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Students can explore curated tech categories, add desired courses to their shopping cart, complete purchase processing, and immediately stream video lessons inside their personalized dashboard.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>✓ Category filtering & search</span>
              <span>✓ Cart & instant enrollment unlocking</span>
              <span>✓ Synchronized lecture progress</span>
            </div>
          </motion.div>

          {/* Instructor Persona */}
          <motion.div 
            className="about-persona-card"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(99,102,241,0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '20px', border: '1px solid rgba(99,102,241,0.25)' }}>
              <FaChalkboardUser />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              INSTRUCTOR STUDIO
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', margin: '8px 0 14px' }}>
              Build & Publish Curriculum
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Educators gain access to an intuitive course creation suite where they can define course metadata, construct modular curriculum sections, upload video lectures, and publish completed tracks.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>✓ Step-by-step course builder</span>
              <span>✓ Section & video lesson uploader</span>
              <span>✓ Course management & publishing</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: HOW THE SYSTEM CONNECTS */}
      <section className="about-architecture-section">
        <motion.div 
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: obysEase }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            System Architecture
          </span>
          <h2 className="nx-section-heading" style={{ marginTop: '4px' }}>
            How The <span className="nx-gradient-brand">Ecosystem Connects</span>
          </h2>
        </motion.div>

        <div className="about-pipeline-flow">
          <div className="about-pipeline-step">
            <span className="about-step-num">01. INSTRUCTOR</span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px' }}>Course Creation</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
              Instructor constructs course details, sections, and uploads video lessons.
            </p>
          </div>

          <div className="about-pipeline-step">
            <span className="about-step-num">02. CATALOG</span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px' }}>Category Listing</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
              Course publishes to NCodeX category catalog for discovery.
            </p>
          </div>

          <div className="about-pipeline-step">
            <span className="about-step-num">03. ENROLLMENT</span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px' }}>Cart & Checkout</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
              Student adds course to cart and completes instant purchase checkout.
            </p>
          </div>

          <div className="about-pipeline-step">
            <span className="about-step-num">04. LEARNING</span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px' }}>Video Player</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
              Video lessons unlock in student dashboard with progress tracking.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: AUTHENTIC PLATFORM CAPABILITIES */}
      <section style={{ padding: '80px 24px', maxWidth: '1300px', margin: '0 auto' }}>
        <motion.div 
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: obysEase }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Technical Capabilities
          </span>
          <h2 className="nx-section-heading" style={{ marginTop: '4px' }}>
            Built On <span className="nx-gradient-brand">Modern Full-Stack Engineering</span>
          </h2>
        </motion.div>

        <div className="about-capabilities-grid">
          <div className="about-story-card">
            <FiLayers style={{ fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '16px' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Category Catalog Engine</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
              Dynamic API queries fetching categories, courses, and section listings.
            </p>
          </div>

          <div className="about-story-card">
            <FiShoppingCart style={{ fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '16px' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Integrated Shopping Cart</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
              Redux-backed cart state management handling instant course enrollment unlocking.
            </p>
          </div>

          <div className="about-story-card">
            <FiVideo style={{ fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '16px' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Self-Paced Video Stream</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
              Interactive video lecture playback integrated directly into learner dashboard views.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: CLOSING STAGE CTA */}
      <section className="ncodex-closing-stage">
        <motion.div 
          className="closing-cta-box"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: obysEase }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Start Your Journey
          </span>
          <h2 className="nx-section-heading" style={{ margin: '12px 0 20px' }}>
            Ready To Master <span className="nx-gradient-brand">Production Skills?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 36px', lineHeight: '1.6' }}>
            Discover job-ready courses, stream video lectures, or start creating your own courses as an instructor today.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link to="/signup" className="nx-btn nx-btn-primary">
                <span>Get Started Free</span>
                <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <a href="/#courses-marquee" className="nx-btn nx-btn-secondary">
                <span>Explore Courses</span>
                <FiArrowUpRight />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;