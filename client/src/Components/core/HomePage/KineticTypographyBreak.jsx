import React from 'react';
import { motion } from 'framer-motion';

const obysEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.9, ease: obysEase },
  },
};

const KineticTypographyBreak = () => {
  return (
    <section className="ncodex-kinetic-break">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '16px' }}>
          The NCodeX Mission
        </span>

        <div className="nx-line-mask">
          <motion.h2 className="kinetic-giant-text" variants={lineVariants}>
            LEARN. BUILD.
          </motion.h2>
        </div>

        <div className="nx-line-mask">
          <motion.h2 className="kinetic-giant-text nx-gradient-brand" variants={lineVariants}>
            DEPLOY. SUCCEED.
          </motion.h2>
        </div>
      </motion.div>
    </section>
  );
};

export default KineticTypographyBreak;
