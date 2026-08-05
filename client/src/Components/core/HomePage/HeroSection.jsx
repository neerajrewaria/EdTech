import React from 'react';
import { FaArrowRight, FaBolt, FaBookOpen, FaUsers } from 'react-icons/fa6';
import CTAButton from './Button';
import HighlightText from './HighlightText';
import '../../../pages/Home.css';

const stats = [
    { icon: <FaUsers />, value: '50k+', label: 'active learners' },
    { icon: <FaBookOpen />, value: '200+', label: 'expert-led lessons' },
    { icon: <FaBolt />, value: '4.9/5', label: 'average rating' }
];

const HeroSection = () => {
    return (
        <section className="hero-shell">
            <div className="hero-grid">
                <div className="hero-copy">
                    <div className="hero-pill">
                        <span className="hero-pill-dot" />
                        New • immersive learning paths for modern engineers
                    </div>

                    <h1 className="hero-title">
                        Learn the skills to build your
                        <span className="hero-highlight">
                            <HighlightText text="future-ready career" />
                        </span>
                    </h1>

                    <p className="hero-description">
                        Explore practical courses, real-world project labs, and mentorship from industry experts designed to help you grow faster and ship with confidence.
                    </p>

                    <div className="hero-actions">
                        <CTAButton active={true} linkto="/signup" data-active="true">
                            <span className="hero-button-label">
                                Start learning
                                <FaArrowRight />
                            </span>
                        </CTAButton>
                        <CTAButton active={false} linkto="/login" data-active="false">
                            <span className="hero-button-label">
                                Watch preview
                                <FaArrowRight />
                            </span>
                        </CTAButton>
                    </div>

                    <div className="hero-stats-row">
                        {stats.map((stat, index) => (
                            <div key={index} className="hero-stat-card">
                                <div className="hero-stat-icon">{stat.icon}</div>
                                <div>
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hero-visual-card">
                    <div className="hero-visual-topbar">
                        <span className="hero-visual-dot dot-red" />
                        <span className="hero-visual-dot dot-yellow" />
                        <span className="hero-visual-dot dot-green" />
                    </div>

                    <div className="hero-visual-body">
                        <div className="hero-visual-sidebar">
                            <span>01</span>
                            <span>02</span>
                            <span>03</span>
                            <span>04</span>
                        </div>

                        <div className="hero-visual-code">
                            <div className="hero-visual-panel">
                                <p className="hero-visual-label">Current track</p>
                                <h3>Full-Stack Experience</h3>
                            </div>
                            <pre>{`const roadmap = [
  'React foundations',
  'API architecture',
  'Deployment pipelines'
];

function buildPortfolio() {
  return roadmap.map(skill => skill);
}`}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
