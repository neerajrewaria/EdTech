import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiShoppingCart, FiFolderPlus, FiUserCheck } from 'react-icons/fi';

const obysEase = [0.16, 1, 0.3, 1];

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
      <motion.div 
        style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: obysEase }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Platform Specifications
        </span>
        <h2 className="nx-section-heading" style={{ marginTop: '4px' }}>
          Built For A <span className="nx-gradient-brand">Seamless EdTech Experience</span>
        </h2>
      </motion.div>

      <div className="capabilities-stack-container">
        {capabilities.map((cap, idx) => (
          <motion.div
            key={idx}
            className="capability-stack-card capability-depth-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: obysEase }}
            whileHover={{ y: -6, scale: 1.01 }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyBetween: 'space-between', gap: '20px' }}>
              <div className="capability-icon-box" style={{ marginBottom: 0 }}>
                {cap.icon}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent)', textTransform: 'uppercase' }}>
                  SPECIFICATION 0{idx + 1}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '700', margin: '4px 0 8px' }}>
                  {cap.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  {cap.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PlatformCapabilities;
