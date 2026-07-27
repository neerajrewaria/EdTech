import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../Components/Common/Footer'
import { apiConnector } from '../services/apiconnector'
import { courseEndpoints } from '../services/apis'
import toast from 'react-hot-toast'
import CourseBuyCard from './CourseBuyCard'
import './CoursePage.css'; // Make sure to import the CSS file below

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
            <div className="premium-page-loading">
                <div className="premium-page-spinner"></div>
                <p>Assembling curriculum workspace...</p>
            </div>
        );
    }

    if (!courseData) {
        return <div className="premium-page-loading">Course details not found.</div>
    }

    return (
        <div className="premium-course-workspace">
            {/* SaaS-Inspired Hero Workspace Banner */}
            <header className="premium-course-hero">
                <div className="premium-hero-container">
                    <nav className="premium-hero-breadcrumb">
                        Home <span className="slash">/</span> Catalog <span className="slash">/</span> <span className="active-path">{courseData?.category?.name}</span>
                    </nav>

                    <h1 className="premium-hero-title">{courseData?.courseName}</h1>
                    <p className="premium-hero-description">{courseData?.courseDescription || "Master these premium skillsets with guided exercises, industry milestones, and verifiable certification portfolios."}</p>

                    <div className="premium-hero-meta-row">
                        <div className="meta-badge-pill">
                            <span className="meta-icon">👤</span>
                            <span>Created by <strong>{courseData?.instructor?.firstname} {courseData?.instructor?.lastname}</strong></span>
                        </div>
                        <div className="meta-badge-pill">
                            <span className="meta-icon">📅</span>
                            <span>Updated {new Date(courseData?.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Split Screen Master Layout Grid */}
            <main className="premium-layout-body">
                <div className="premium-layout-container">

                    {/* LEFT PANEL: Core Educational Curriculum Sections */}
                    <section className="premium-course-main-column">

                        {/* What You'll Learn Segment */}
                        <div className="premium-learning-card">
                            <h2 className="premium-column-heading">
                                <span className="heading-marker"></span>
                                Objectives & Learning Outcomes
                            </h2>
                            <div className="premium-learning-grid-content">
                                <p className="learning-paragraph-text">
                                    {courseData?.whatYouWillLearn || "No structural outcomes provided yet for this module."}
                                </p>
                            </div>
                        </div>

                        {/* Syllabus & Structural Component Section */}
                        <div className="premium-syllabus-card">
                            <div className="premium-syllabus-header-strip">
                                <div className="header-left-title-block">
                                    <h2 className="premium-column-heading">Course Curriculum</h2>
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
                                                    <div className="node-toggle-chevron">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                    <span className="node-section-title">{section.sectionName}</span>
                                                </div>
                                                <div className="node-header-right">
                                                    <span className="node-lecture-badge">
                                                        {section.subSection?.length || 0} {section.subSection?.length === 1 ? 'lecture' : 'lectures'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Nested Subsection Lists */}
                                            <div className="premium-node-drawer">
                                                <div className="drawer-inner-padding">
                                                    {section.subSection?.map((sub) => (
                                                        <div key={sub._id} className="premium-subsection-row">
                                                            <div className="sub-row-left">
                                                                <div className="sub-video-icon-box">
                                                                    <svg width="10" height="12" viewBox="0 0 24 28" fill="currentColor">
                                                                        <path d="M23 12L1.5 24.5V-.5L23 12z" />
                                                                    </svg>
                                                                </div>
                                                                <span className="sub-row-title">{sub.title}</span>
                                                            </div>
                                                            <div className="sub-row-right">
                                                                <span className="sub-row-status-tag">Premium Module</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

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