import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaUsers, FaEarthAmericas, FaGift } from 'react-icons/fa6';
import HighlightText from './HighlightText';
import instructorImg from '../../../assests/Images/office.jpg';

import './Instructor.css';

const Instructor = () => {
  return (
    <div className="instructor-join-panel-master-holder">

      {/* Redesigned Instructor Section Callout Banner */}
      <section className="instructor-join-panel-root-canvas">
        <div className="instructor-join-panel-wrapper">

          {/* LEFT ASPECT LAYER: Creative Parallax Frame Design */}
          <div className="instructor-join-panel-media-side">
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
          </div>

          {/* RIGHT ASPECT LAYER: SaaS Typography Hierarchy & Trust Blocks */}
          <div className="instructor-join-panel-content-side">
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
          </div>

        </div>
      </section>

    </div>
  );
};

export default Instructor;
