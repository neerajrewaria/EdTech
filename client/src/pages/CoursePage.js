import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Components/Common/Footer';
import { apiConnector } from '../services/apiconnector';
import { courseEndpoints } from '../services/apis';
import toast from 'react-hot-toast';
import CourseBuyCard from './CourseBuyCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiUser, FiCalendar, FiBookOpen, FiPlayCircle, FiCheckCircle } from 'react-icons/fi';
import HighlightText from '../Components/core/HomePage/HighlightText';
import './CoursePage.css';

const CoursePage = () => {
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState([]);

    // Calculate total lectures using useMemo
    const totalLectures = useMemo(() => {
        let count = 0;
        courseData?.courseContent?.forEach((section) => {
            count += section.subSection?.length || 0;
        });
        return count;
    }, [courseData]);


    const handleActive = (id) => {
        if (isActive.includes(id)) {
            const newList = isActive.filter((activeId) => activeId !== id);
            setIsActive(newList);
        } else {
            setIsActive([...isActive, id]);
        }
    };

    useEffect(() => {
        const fetchCourseDetails = async () => {
            setLoading(true);
            try {
                const response = await apiConnector("GET", `${courseEndpoints.GET_COURSE_DETAILS_API}/${courseId.trim()}`);

                if (!response?.data?.success) {
                    throw new Error(response?.data?.message || "Course details could not be retrieved");
                }

                setCourseData(response.data.data);
            } catch (error) {
                console.error("COURSE DETAILS FETCH ERROR....", error);
                toast.error(error.response?.data?.message || error.message || "Failed to load course details");
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourseDetails();
        }
    }, [courseId]);

    if (loading) {
        return (
            <div className="premium-page-loading premium-course-workspace">
                <div className="premium-page-spinner"></div>
                <p>Assembling curriculum workspace...</p>
            </div>
        );
    }

    if (!courseData) {
        return <div className="premium-page-loading premium-course-workspace">Course details not found.</div>
    }

    return (
        <div className="premium-course-workspace">
            {/* SaaS-Inspired Hero Workspace Banner */}
            <header className="premium-course-hero">
                <motion.div 
                    className="premium-hero-container"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <nav className="premium-hero-breadcrumb">
                        Home <span className="slash">/</span> Catalog <span className="slash">/</span> <span className="active-path">{courseData?.category?.name}</span>
                    </nav>

                    <h1 className="premium-hero-title">
                        {courseData?.courseName?.split(" ").length > 1 
                            ? <>
                                {courseData?.courseName?.split(" ").slice(0, -1).join(" ")}
                                <HighlightText text={courseData?.courseName?.split(" ").slice(-1)[0]} />
                              </>
                            : courseData?.courseName
                        }
                    </h1>
                    <p className="premium-hero-description">{courseData?.courseDescription || "Master these premium skillsets with guided exercises, industry milestones, and verifiable certification portfolios."}</p>

                    <div className="premium-hero-meta-row">
                        <div className="meta-badge-pill">
                            <FiUser className="meta-icon" />
                            <span>Created by <strong>{courseData?.instructor?.firstname} {courseData?.instructor?.lastname}</strong></span>
                        </div>
                        <div className="meta-badge-pill">
                            <FiCalendar className="meta-icon" />
                            <span>Updated {new Date(courseData?.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </motion.div>
            </header>

            {/* Split Screen Master Layout Grid */}
            <main className="premium-layout-body">
                <div className="premium-layout-container">

                    {/* LEFT PANEL: Core Educational Curriculum Sections */}
                    <motion.section 
                        className="premium-course-main-column"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {/* What You'll Learn Segment */}
                        <div className="premium-learning-card glassmorphic-card">
                            <h2 className="premium-column-heading">
                                <FiCheckCircle className="heading-icon" />
                                Objectives & Learning Outcomes
                            </h2>
                            <div className="premium-learning-grid-content">
                                <p className="learning-paragraph-text">
                                    {courseData?.whatYouWillLearn || "No structural outcomes provided yet for this module."}
                                </p>
                            </div>
                        </div>

                        {/* Syllabus & Structural Component Section */}
                        <div className="premium-syllabus-card glassmorphic-card">
                            <div className="premium-syllabus-header-strip">
                                <div className="header-left-title-block">
                                    <h2 className="premium-column-heading"><FiBookOpen className="heading-icon" /> Course Curriculum</h2>
                                    <div className="premium-syllabus-stats-row">
                                        <span className="stat-item">{courseData?.courseContent?.length || 0} Modules</span>
                                        <span className="stat-dot">•</span>
                                        <span className="stat-item">{totalLectures} Lectures</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reorganized Accordion Component Interface */}
                            <div className="premium-accordion-stack">
                                {courseData?.courseContent?.map((section) => {
                                    const isSectionOpen = isActive.includes(section._id);
                                    return (
                                        <div key={section._id} className={`premium-accordion-node ${isSectionOpen ? 'node-expanded' : ''}`}>
                                            <div
                                                className="premium-node-header"
                                                onClick={() => handleActive(section._id)}
                                                role="button"
                                                aria-expanded={isSectionOpen}
                                            >
                                                <div className="node-header-left">
                                                    <motion.div 
                                                        className="node-toggle-chevron"
                                                        animate={{ rotate: isSectionOpen ? 180 : 0 }}
                                                    >
                                                        <FiChevronDown />
                                                    </motion.div>
                                                    <span className="node-section-title">{section.sectionName}</span>
                                                </div>
                                                <div className="node-header-right">
                                                    <span className="node-lecture-badge">
                                                        {section.subSection?.length || 0} {section.subSection?.length === 1 ? 'lecture' : 'lectures'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Nested Subsection Lists with AnimatePresence */}
                                            <AnimatePresence>
                                                {isSectionOpen && (
                                                    <motion.div 
                                                        className="premium-node-drawer"
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="drawer-inner-padding">
                                                            {section.subSection?.map((sub) => (
                                                                <div key={sub._id} className="premium-subsection-row">
                                                                    <div className="sub-row-left">
                                                                        <div className="sub-video-icon-box">
                                                                            <FiPlayCircle />
                                                                        </div>
                                                                        <span className="sub-row-title">{sub.title}</span>
                                                                    </div>
                                                                    <div className="sub-row-right">
                                                                        <span className="sub-row-status-tag">Premium Module</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.section>

                    {/* RIGHT PANEL: Sticky Course Checkout Card Space */}
                    <aside className="premium-course-sidebar-column">
                        <CourseBuyCard courseData={courseData} />
                    </aside>

                </div>
            </main>

            <Footer />
        </div>
    )
};

export default CoursePage;