import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiMessageSquare, FiBarChart2, FiCode, FiAward, FiTarget } from 'react-icons/fi';

const featuresData = [
  {
    icon: <FiStar />,
    title: 'Expert Engineering Faculty',
    description: 'Learn directly from industry leaders and senior engineers who have architected scalable production platforms.',
    span: 'bento-span-4',
  },
  {
    icon: <FiMessageSquare />,
    title: 'Real-Time Mentor Network',
    description: 'Never stay blocked. Connect with mentors directly to resolve complex technical hurdles and architectural questions.',
    span: 'bento-span-8',
  },
  {
    icon: <FiCode />,
    title: 'In-Browser Cloud IDE',
    description: 'Execute code instantly with automated test suites, terminal output, and integrated debugging environments.',
    span: 'bento-span-8',
  },
  {
    icon: <FiBarChart2 />,
    title: 'Progress Analytics',
    description: 'Visualize your growth with detailed skill mapping, milestone rewards, and completion metrics.',
    span: 'bento-span-4',
  },
  {
    icon: <FiAward />,
    title: 'Verified Skill Certificates',
    description: 'Earn tamper-proof credentials that validate your mastery on LinkedIn and technical portfolios.',
    span: 'bento-span-6',
  },
  {
    icon: <FiTarget />,
    title: 'Structured Career Paths',
    description: 'Follow guided roadmaps built to take you from foundational concepts to job-ready engineering roles.',
    span: 'bento-span-6',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const CapabilityGrid = () => {
  return (
    <section className="ncodex-capability-grid">
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nx-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Integrated Technical Ecosystem
        </span>
        <h2 className="nx-section-title" style={{ marginTop: '8px' }}>
          Everything You Need To <span className="nx-gradient-text">Build & Excel</span>
        </h2>
      </div>

      <motion.div 
        className="bento-matrix"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {featuresData.map((item, idx) => (
          <motion.div 
            key={idx} 
            className={`bento-box ${item.span}`}
            variants={fadeUp}
          >
            <div className="bento-icon-wrapper">
              {item.icon}
            </div>

            <h3 className="bento-title">
              {item.title}
            </h3>

            <p className="bento-desc">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CapabilityGrid;
