import React from 'react';
import Timeline1 from "../../../assests/Images/Timeline1.png";
import { PiStudentFill } from "react-icons/pi";
import { IoMdSchool } from "react-icons/io";
import { GiFlexibleStar } from "react-icons/gi";
import { TbBrandAdobeIllustrator } from "react-icons/tb";
import './Timeline.css';

const refinedTimelineData = [
    {
        logo: <PiStudentFill />,
        heading: "Industry-Led Curriculum",
        description: "Master highly relevant technical stacks curated by veteran engineering mentors."
    },
    {
        logo: <IoMdSchool />,
        heading: "Student-First Ecosystem",
        description: "Accelerate your path with persistent platform guidance and verified reviews."
    },
    {
        logo: <GiFlexibleStar />,
        heading: "Adaptive Training Paths",
        description: "Flexibly switch between specialized frameworks as modern market demands evolve."
    },
    {
        logo: <TbBrandAdobeIllustrator />,
        heading: "Production-Grade Capstones",
        description: "Solve complex operational architecture dilemmas with interactive code compiler labs."
    }
];

const Timeline = () => {
    return (
        <section className="homepage-timeline-view-root">
            <div className="homepage-timeline-view-grid-container">
                
                {/* LEFT SYSTEM: Connected Micro-Progress Track */}
                <div className="homepage-timeline-view-left-column">
                    {/* The animated track line assembly */}
                    <div className="homepage-timeline-view-track-container" aria-hidden="true">
                        <div className="homepage-timeline-view-track-pulse-node"></div>
                    </div>
                    
                    {refinedTimelineData.map((item, index) => (
                        <div 
                            className="homepage-timeline-view-step-node" 
                            key={index}
                        >
                            {/* Animated Icon Bubble */}
                            <div className="homepage-timeline-view-icon-bubble">
                                <div className="homepage-timeline-view-icon-inner">
                                    {item.logo}
                                </div>
                            </div>

                            {/* Text Panels */}
                            <div className="homepage-timeline-view-text-pane">
                                <h3 className="homepage-timeline-view-node-title">
                                    {item.heading}
                                </h3>
                                <p className="homepage-timeline-view-node-desc">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT SYSTEM: Graphic Preview and Elevated Stats Panel */}
                <div className="homepage-timeline-view-right-column">
                    <div className="homepage-timeline-view-media-canvas">
                        <img
                            src={Timeline1}
                            alt="NCodex Learning Workspace Interactive Preview"
                            className="homepage-timeline-view-display-img"
                        />
                        
                        {/* Overlaid Elevated Stats Panel */}
                        <div className="homepage-timeline-view-metrics-overlay-card">
                            <div className="homepage-timeline-view-stat-segment">
                                <h4 className="homepage-timeline-view-stat-number">10</h4>
                                <p className="homepage-timeline-view-stat-caption">
                                    Years of <br /> Innovation
                                </p>
                            </div>
                            
                            <div className="homepage-timeline-view-stat-divider" aria-hidden="true"></div>
                            
                            <div className="homepage-timeline-view-stat-segment">
                                <h4 className="homepage-timeline-view-stat-number">250+</h4>
                                <p className="homepage-timeline-view-stat-caption">
                                    Interactive <br /> Tracks
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Timeline;