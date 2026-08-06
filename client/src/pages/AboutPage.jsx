import React from 'react';
import { RiAwardLine, RiShieldUserLine, RiTeamLine, RiCompassDiscoverLine } from "react-icons/ri";
import Footer from '../Components/Common/Footer';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <>
      <div className="about-us-workspace-root-canvas">
        
        {/* HERO HEADER AREA */}
        <section className="about-us-workspace-hero-strip">
          <div className="about-us-workspace-hero-inner">
            <span className="about-us-workspace-pill-tag">Our Philosophy</span>
            <h1 className="about-us-workspace-main-title">
              We are decoding the future of global technical education.
            </h1>
            <p className="about-us-workspace-hero-subtitle">
              NCodeX is an ecosystem designed by engineers, for engineers. We build immersive architectures that bridge academic baselines with advanced industry workflows.
            </p>
          </div>
        </section>

        {/* METRICS METADATA SECTION */}
        <section className="about-us-workspace-metrics-bar">
          <div className="about-us-workspace-metrics-grid">
            <div className="about-us-workspace-metric-card">
              <h2 className="about-us-workspace-metric-number">50K+</h2>
              <p className="about-us-workspace-metric-label">Active Engineers</p>
            </div>
            <div className="about-us-workspace-metric-card">
              <h2 className="about-us-workspace-metric-number">180+</h2>
              <p className="about-us-workspace-metric-label">Premium Sandbox Tracks</p>
            </div>
            <div className="about-us-workspace-metric-card">
              <h2 className="about-us-workspace-metric-number">94.6%</h2>
              <p className="about-us-workspace-metric-label">Career Progression Rate</p>
            </div>
          </div>
        </section>

        {/* CORE CORE VALUE DUAL GRID MODULE */}
        <main className="about-us-workspace-editorial-body">
          <div className="about-us-workspace-editorial-container">
            
            {/* Left Narrative Stick Section */}
            <div className="about-us-workspace-narrative-sticky-pane">
              <h3 className="about-us-workspace-sticky-heading">The Pillars of NCodex</h3>
              <p className="about-us-workspace-sticky-text">
                Traditional education teaches theoretical architecture. NCodex is structured to let you compile, deploy, test, and master practical production stacks in real-time.
              </p>
              <div className="about-us-workspace-ambient-glow"></div>
            </div>

            {/* Right Value Grid Panel */}
            <div className="about-us-workspace-pillars-grid">
              
              <div className="about-us-workspace-pillar-item-card">
                <div className="about-us-workspace-icon-wrapper aura-cyan">
                  <RiCompassDiscoverLine />
                </div>
                <h4 className="about-us-workspace-card-title">Guided Navigation</h4>
                <p className="about-us-workspace-card-desc">
                  No dead ends. Every track guides you chronologically through interactive dependency graphs to ensure you unlock production competence step-by-step.
                </p>
              </div>

              <div className="about-us-workspace-pillar-item-card">
                <div className="about-us-workspace-icon-wrapper aura-blue">
                  <RiShieldUserLine />
                </div>
                <h4 className="about-us-workspace-card-title">Production Sanity</h4>
                <p className="about-us-workspace-card-desc">
                  Every project is vetted against industry security benchmarks and best formatting practices, instilling true engineering discipline early on.
                </p>
              </div>

              <div className="about-us-workspace-pillar-item-card">
                <div className="about-us-workspace-icon-wrapper aura-purple">
                  <RiTeamLine />
                </div>
                <h4 className="about-us-workspace-card-title">Peer Code Reviews</h4>
                <p className="about-us-workspace-card-desc">
                  Engage directly with community maintainers, build robust collaborative networks, and ship open-source contributions.
                </p>
              </div>

              <div className="about-us-workspace-pillar-item-card">
                <div className="about-us-workspace-icon-wrapper aura-gold">
                  <RiAwardLine />
                </div>
                <h4 className="about-us-workspace-card-title">Verifiable Credentials</h4>
                <p className="about-us-workspace-card-desc">
                  Earn multi-layered cryptographically verifiable certificates linked directly to your GitHub repository achievements.
                </p>
              </div>

            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;