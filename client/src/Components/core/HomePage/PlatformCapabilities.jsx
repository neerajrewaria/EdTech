import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiShoppingCart, FiFolderPlus, FiUserCheck } from 'react-icons/fi';

const capabilities = [
  {
    icon: <FiBookOpen />,
    title: 'Structured Video Curriculum',
    description: 'Courses organized into clear, sequential sections and self-paced video lectures so you can learn methodically.'
  },
  {
    icon: <FiShoppingCart />,
    title: 'Cart & Instant Enrollment',
    description: 'Save interested courses to your cart, complete your purchase, and immediately unlock video content in your dashboard.'
  },
  {
    icon: <FiFolderPlus />,
    title: 'Instructor Studio & Builder',
    description: 'Empowering educators to construct courses, assemble curriculum sections, and upload video lessons seamlessly.'
  },
  {
    icon: <FiUserCheck />,
    title: 'Secure Account & Profile Studio',
    description: 'JWT-backed secure authentication keeping your enrolled courses, profile settings, and cart synchronized.'
  }
];

const PlatformCapabilities = () => {
  return (
    <section className="ncodex-capabilities-section">
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Platform Specifications
        </span>
        <h2 className="nx-section-heading" style={{ marginTop: '4px' }}>
          Built For A <span className="nx-gradient-brand">Seamless EdTech Experience</span>
        </h2>
      </div>

      <div className="capabilities-grid">
        {capabilities.map((cap, idx) => (
          <motion.div
            key={idx}
            className="capability-depth-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="capability-icon-box">
              {cap.icon}
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '10px' }}>
              {cap.title}
            </h3>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              {cap.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PlatformCapabilities;
