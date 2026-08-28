import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiShoppingCart, FiFolderPlus, FiUserCheck } from 'react-icons/fi';

const features = [
  {
    index: "01",
    title: "Structured Video Curriculum & Modules",
    description: "Learn step-by-step through organized course sections and video lectures designed to take you from fundamentals to advanced skills.",
    icon: <FiBookOpen />,
    preview: (
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        <div style={{ color: 'var(--nx-cyan)' }}>Course Structure // Web Architecture</div>
        <div style={{ color: 'var(--nx-text)', marginTop: '8px' }}>✓ Section 1: Core Fundamentals (3 Lectures)</div>
        <div style={{ color: 'var(--nx-text)', marginTop: '4px' }}>✓ Section 2: Advanced Concepts (5 Lectures)</div>
        <div style={{ color: 'var(--nx-emerald)', marginTop: '8px' }}>Access self-paced video content anytime</div>
      </div>
    )
  },
  {
    index: "02",
    title: "Integrated Shopping Cart & Checkout",
    description: "Explore catalog categories, save courses to your cart, and complete your enrollment through a streamlined purchasing flow.",
    icon: <FiShoppingCart />,
    preview: (
      <div style={{ fontSize: '0.88rem' }}>
        <div style={{ borderBottom: '1px solid var(--nx-border)', paddingBottom: '8px', marginBottom: '8px' }}>
          <span style={{ color: 'var(--nx-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>Shopping Cart Status</span>
        </div>
        <div style={{ color: 'var(--nx-text-secondary)', lineHeight: '1.5' }}>
          Active Cart Items • Instant Course Access • Secure Checkout Integration
        </div>
      </div>
    )
  },
  {
    index: "03",
    title: "Instructor Course Creation Studio",
    description: "Empowering educators with tools to construct courses, assemble curriculum sections, upload video lessons, and publish content.",
    icon: <FiFolderPlus />,
    preview: (
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        <div style={{ color: 'var(--nx-cyan)' }}>Instructor Studio Workspace</div>
        <div style={{ color: 'var(--nx-text)', marginTop: '8px' }}>[+] Add New Section</div>
        <div style={{ color: 'var(--nx-emerald)', marginTop: '4px' }}>[+] Upload Video Lecture</div>
      </div>
    )
  },
  {
    index: "04",
    title: "Personalized Dashboards & Progress",
    description: "Keep track of all your enrolled courses, manage account profile details, and jump right back into learning whenever you log in.",
    icon: <FiUserCheck />,
    preview: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--nx-emerald)' }}>
        <span style={{ fontSize: '1.4rem' }}>👤</span>
        <div>
          <strong style={{ display: 'block', color: 'var(--nx-text)' }}>Authenticated Learner Profile</strong>
          <span>Enrolled Courses & Progress Synced</span>
        </div>
      </div>
    )
  }
];

const StickyKinematicFeatures = () => {
  return (
    <section className="ncodex-kinematic-features">
      <div style={{ marginBottom: '60px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nx-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Act IV — Platform Capabilities
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 4vw, 4rem)', fontWeight: '800', marginTop: '8px', textTransform: 'uppercase' }}>
          Engineered For <span style={{ color: 'var(--nx-cyan)' }}>Seamless Learning</span>
        </h2>
      </div>

      {features.map((item) => (
        <motion.div
          key={item.index}
          className="kinematic-feature-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="kinematic-index">{item.index} — Capability</span>
            <h3 className="kinematic-title">{item.title}</h3>
            <p className="kinematic-desc">{item.description}</p>
          </div>

          <div className="kinematic-visual-card">
            {item.preview}
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default StickyKinematicFeatures;
