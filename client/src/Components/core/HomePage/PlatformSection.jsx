import React from 'react';
import { FaArrowRight, FaCode, FaGraduationCap, FaRocket } from 'react-icons/fa6';
import CTAButton from './Button';
import HighlightText from './HighlightText';
import '../../../pages/Home.css';

const featureCards = [
    {
        icon: <FaCode />,
        title: 'Live coding labs',
        text: 'Practice in realistic sandboxes and ship production-ready work.'
    },
    {
        icon: <FaGraduationCap />,
        title: 'Guided curriculum',
        text: 'Follow structured pathways from fundamentals to advanced concepts.'
    },
    {
        icon: <FaRocket />,
        title: 'Career support',
        text: 'Build portfolio projects and receive feedback that keeps you moving.'
    }
];

const PlatformSection = () => {
    return (
        <section className="platform-shell">
            <div className="platform-intro">
                <div>
                    <p className="section-tag">Why learners choose EdTech</p>
                    <h2>
                        Everything you need to train, ship, and grow with
                        <span className="hero-highlight">
                            <HighlightText text="confidence" />
                        </span>
                    </h2>
                </div>
                <p className="section-copy">
                    Our platform blends high-signal curriculum, live exercises, and mentor guidance so you can turn learning into momentum.
                </p>
            </div>

            <div className="platform-card-grid">
                {featureCards.map((card, index) => (
                    <div key={index} className="platform-card">
                        <div className="platform-card-icon">{card.icon}</div>
                        <h3>{card.title}</h3>
                        <p>{card.text}</p>
                    </div>
                ))}
            </div>

            <div className="platform-panel">
                <div className="platform-panel-copy">
                    <p className="section-tag">Designed for modern teams</p>
                    <h3>Build a portfolio, master the stack, and stand out in interviews.</h3>
                </div>
                <CTAButton active={true} linkto="/signup" data-active="true">
                    <span className="hero-button-label">
                        Explore full catalog
                        <FaArrowRight />
                    </span>
                </CTAButton>
            </div>
        </section>
    );
};

export default PlatformSection;
