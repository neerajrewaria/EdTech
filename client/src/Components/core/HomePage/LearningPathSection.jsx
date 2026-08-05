import React from 'react';
import { FaArrowRight, FaLayerGroup, FaPlay } from 'react-icons/fa6';
import CTAButton from './Button';
import HighlightText from './HighlightText';
import '../../../pages/Home.css';

const milestones = [
    'Master core fundamentals in guided modules',
    'Practice with project-based assignments',
    'Prepare for interviews and real-world delivery'
];

const LearningPathSection = () => {
    return (
        <section className="learning-shell">
            <div className="learning-grid">
                <div className="learning-copy">
                    <p className="section-tag">A seamless learning path</p>
                    <h2>
                        Move from curious beginner to
                        <span className="hero-highlight">
                            <HighlightText text="job-ready builder" />
                        </span>
                    </h2>
                    <p className="section-copy">
                        Each course is structured around milestones, feedback loops, and visible progress so learning feels clear and motivating.
                    </p>

                    <ul className="milestone-list">
                        {milestones.map((item, index) => (
                            <li key={index}>
                                <FaLayerGroup />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <CTAButton active={false} linkto="/login" data-active="false">
                        <span className="hero-button-label">
                            View learning roadmap
                            <FaArrowRight />
                        </span>
                    </CTAButton>
                </div>

                <div className="learning-visual-card">
                    <div className="learning-visual-top">
                        <div>
                            <p className="section-tag">Course preview</p>
                            <h3>Frontend mastery sprint</h3>
                        </div>
                        <div className="play-pill">
                            <FaPlay />
                        </div>
                    </div>

                    <div className="learning-visual-body">
                        <div className="learning-progress-row">
                            <span>Module 01</span>
                            <strong>Build a polished UI</strong>
                        </div>
                        <div className="learning-progress-row">
                            <span>Module 02</span>
                            <strong>Connect data and APIs</strong>
                        </div>
                        <div className="learning-progress-row">
                            <span>Module 03</span>
                            <strong>Deploy and iterate</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LearningPathSection;
