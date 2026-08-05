import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import CTAButton from './Button';
import HighlightText from './HighlightText';
import instructorImg from '../../../assests/Images/office.jpg';
import '../../../pages/Home.css';

const InstructorSection = () => {
    return (
        <section className="instructor-shell">
            <div className="instructor-grid">
                <div className="instructor-media">
                    <img src={instructorImg} alt="Instructor teaching online" />
                    <div className="instructor-badge">
                        <strong>5k+</strong>
                        <span>global mentors</span>
                    </div>
                </div>

                <div className="instructor-copy">
                    <p className="section-tag">Become an instructor</p>
                    <h2>
                        Share your expertise and help learners grow into
                        <span className="hero-highlight">
                            <HighlightText text="world-class builders" />
                        </span>
                    </h2>
                    <p className="section-copy">
                        Teach with the tools, structure, and global reach you need to make a real impact through online education.
                    </p>

                    <div className="instructor-metrics">
                        <div>
                            <strong>70M+</strong>
                            <span>students reached</span>
                        </div>
                        <div>
                            <strong>100+</strong>
                            <span>countries</span>
                        </div>
                        <div>
                            <strong>$0</strong>
                            <span>hosting cost</span>
                        </div>
                    </div>

                    <CTAButton active={true} linkto="/signup" data-active="true">
                        <span className="hero-button-label">
                            Start teaching today
                            <FaArrowRight />
                        </span>
                    </CTAButton>
                </div>
            </div>
        </section>
    );
};

export default InstructorSection;
