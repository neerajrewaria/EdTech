import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaUsers, FaEarthAmericas, FaGift } from 'react-icons/fa6';
import HighlightText from './HighlightText';
import instructorImg from '../../../assests/Images/office.jpg';
import './Instructor.css';

const instrReveal = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const instrStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};


const Instructor = () => {
  return (
    <div className="instructor-join-panel-master-holder">
      <section className="instructor-join-panel-root-canvas">
        <motion.div
          className="instructor-join-panel-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={instrStagger}
        >
          {/* LEFT ASPECT LAYER */}
          <motion.div className="instructor-join-panel-media-side" variants={instrReveal}>
            <div className="instructor-join-panel-asymmetric-bounding-box">
              <div className="instructor-join-panel-decorative-bg-mesh"></div>
              <img
                src={instructorImg}
                alt="Become an Instructor with NCodex"
                className="instructor-join-panel-hero-img"
              />
              <div className="instructor-join-panel-floating-metric-card">
                <span className="metric-icon-badge">🚀</span>
                <div>
                  <h5>Join 5,000+</h5>
                  <p>Global Tech Mentors</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT ASPECT LAYER */}
          <motion.div className="instructor-join-panel-content-side" variants={instrReveal}>
            <div className="instructor-join-panel-text-block">
              <span className="instructor-join-panel-context-pre-title">
                <FaEarthAmericas className="instructor-eyebrow-icon" />
                Global Faculty Network
              </span>

              <h1 className="instructor-join-panel-main-heading">
                Become an <br />
                <span className="instructor-join-panel-highlight-fix">
                  <HighlightText text={"instructor"} />
                </span>
              </h1>

              <p className="instructor-join-panel-description">
                Instructors from around the world teach millions of students on EdTech.
                We provide the tools, structural framework, and production runtime environments
                you need to share your specialized knowledge with ultimate confidence.
              </p>

              <div className="instructor-join-panel-value-metrics-row">
                <div className="metric-node-block">
                  <span className="metric-node-icon">
                    <FaUsers />
                  </span>
                  <div>
                    <h4>70M+</h4>
                    <p>Enrolled Students</p>
                  </div>
                </div>
                <div className="metric-node-block">
                  <span className="metric-node-icon">
                    <FaEarthAmericas />
                  </span>
                  <div>
                    <h4>100+</h4>
                    <p>Countries Reached</p>
                  </div>
                </div>
                <div className="metric-node-block">
                  <span className="metric-node-icon">
                    <FaGift />
                  </span>
                  <div>
                    <h4>$0</h4>
                    <p>Platform Hosting Fees</p>
                  </div>
                </div>
              </div>

              <div className="CTA-BUTTON-DIV">
                <Link to="/signup" className="hero-btn-primary instructor-hero-btn">
                  <span className="cta-button-text-flex">
                    Start Teaching Today
                    <FaArrowRight className="cta-button-arrow-icon" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Instructor;
