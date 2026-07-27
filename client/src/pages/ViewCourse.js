import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import Footer from "../Components/Common/Footer";
import { apiConnector } from "../services/apiconnector";
import { courseEndpoints } from "../services/apis";
// import "../App.css";
import "./ViewCourse.css";

// ViewCourse styles are intentionally scoped via unique class names (vc-*).

/* ----------------------------- tiny icon set ----------------------------- */
/* Inline SVGs keep the component dependency-free and crisp on the dark theme */
const Icon = {
    ArrowLeft: (props) => (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    ),
    Play: (props) => (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
            <path d="M8 5v14l11-7z" />
        </svg>
    ),
    Prev: (props) => (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="15 18 9 12 15 6" />
        </svg>
    ),
    Next: (props) => (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="9 18 15 12 9 6" />
        </svg>
    ),
    Check: (props) => (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    Chevron: (props) => (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="6 9 12 15 18 9" />
        </svg>
    ),
    Layers: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    ),
    Film: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="2" y="2" width="20" height="20" rx="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
    ),
    CheckCircle: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    ),
    Trophy: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
    ),
    Calendar: (props) => (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    Bookmark: (props) => (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
    ),
    File: (props) => (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    ),
    Download: (props) => (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    ),
    MessageSquare: (props) => (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    ),
    User: (props) => (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    Send: (props) => (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    ),
    Grid: (props) => (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
};

const safeUrl = (url) => {
    if (!url || typeof url !== "string") return null;
    return url.trim() ? url : null;
};

/* ----------------------- STATIC PLACEHOLDER DATA ONLY -----------------------
   These arrays back purely visual sections (Resources / Notes / Discussion /
   Downloads). They are NOT wired to any API or backend logic. */
const PLACEHOLDER_RESOURCES = [
    { id: "res-1", name: "Lecture Notes.pdf", type: "PDF", size: "1.2 MB" },
    { id: "res-2", name: "Course Slides.pptx", type: "Slides", size: "3.4 MB" },
    { id: "res-3", name: "Source Code.zip", type: "Code", size: "820 KB" },
    { id: "res-4", name: "Practice Dataset.csv", type: "Dataset", size: "540 KB" },
];

const PLACEHOLDER_DOWNLOADS = [
    { id: "dl-1", name: "Full Course Notes.pdf", size: "4.8 MB" },
    { id: "dl-2", name: "Exercise Files.zip", size: "12.1 MB" },
    { id: "dl-3", name: "Cheat Sheet.pdf", size: "640 KB" },
];

const PLACEHOLDER_DISCUSSION = [
    {
        id: "disc-1",
        name: "Aarav Sharma",
        time: "2 days ago",
        message: "Great explanation in this lecture! The example around the 6:30 mark really helped it click for me.",
    },
    {
        id: "disc-2",
        name: "Priya Verma",
        time: "5 days ago",
        message: "Is there a follow-up resource for the edge cases mentioned here?",
    },
];

const LEARNING_OBJECTIVES = [
    "Understand the core concept introduced in this lecture",
    "Apply the technique through a guided, hands-on example",
    "Recognize common mistakes and how to avoid them",
    "Build a foundation for the next lecture in this section",
];

const KEY_TAKEAWAYS = [
    "Concept explained with practical, real-world examples",
    "Step-by-step walkthrough you can revisit anytime",
    "Directly connects to upcoming lectures in this course",
];

const TABS = [
    { id: "overview", label: "Overview" },
    { id: "resources", label: "Resources" },
    { id: "notes", label: "Notes" },
    { id: "discussion", label: "Discussion" },
    { id: "downloads", label: "Downloads" },
];

const ViewCourse = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(false);

    // UI state
    const [expandedSections, setExpandedSections] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null); // { subsectionId, videoUrl, title }
    const [completed, setCompleted] = useState({}); // { [subsectionId]: true }

    // ---- New, purely presentational UI state (placeholder sections only) ----
    const [activeTab, setActiveTab] = useState("overview");
    const [bookmarked, setBookmarked] = useState({}); // { [subsectionId]: true } - visual only

    const totalLectures = useMemo(() => {
        let count = 0;
        courseData?.courseContent?.forEach((section) => {
            count += section.subSection?.length || 0;
        });
        return count;
    }, [courseData]);

    const completedCount = useMemo(() => {
        return Object.values(completed).filter(Boolean).length;
    }, [completed]);

    const progressPercent = useMemo(() => {
        if (!totalLectures) return 0;
        return Math.round((completedCount / totalLectures) * 100);
    }, [completedCount, totalLectures]);

    // Flat ordered list of lectures, used for "lesson N of total" numbering
    const flatLectures = useMemo(() => {
        const list = [];
        courseData?.courseContent?.forEach((section) => {
            (section.subSection || []).forEach((sub) => {
                list.push({ sectionId: section._id, subsectionId: sub._id });
            });
        });
        return list;
    }, [courseData]);

    const currentLectureIndex = useMemo(() => {
        if (!selectedVideo) return -1;
        return flatLectures.findIndex((l) => l.subsectionId === selectedVideo.subsectionId);
    }, [flatLectures, selectedVideo]);

    const toggleSection = (sectionId) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const firstSelectableVideo = (data) => {
        const content = data?.courseContent || [];
        for (const section of content) {
            for (const sub of section?.subSection || []) {
                const url = safeUrl(
                    sub?.videoUrl ||
                    sub?.videoURL ||
                    sub?.video ||
                    sub?.url ||
                    sub?.lectureVideo ||
                    sub?.videoUrl?.url ||
                    sub?.videoURL?.url ||
                    sub?.video?.url
                );

                if (url) {
                    return {
                        subsectionId: sub._id,
                        videoUrl: url,
                        title: sub.title,
                        sectionId: section._id,
                    };
                }
            }
        }
        return null;
    };

    const fetchCourseDetails = async () => {
        setLoading(true);
        try {
            const response = await apiConnector(
                "GET",
                `${courseEndpoints.GET_COURSE_DETAILS_API}/${courseId.trim()}`
            );

            if (!response?.data?.success) {
                throw new Error(
                    response?.data?.message || "Course details could not be retrieved"
                );
            }

            const data = response.data.data;
            setCourseData(data);

            const initialVideo = firstSelectableVideo(data);
            if (initialVideo) {
                setSelectedVideo(initialVideo);
                setExpandedSections((prev) => (prev.includes(initialVideo.sectionId) ? prev : [...prev, initialVideo.sectionId]));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Failed to load course details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (courseId) fetchCourseDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId]);

    const extractVideoUrl = (sub) => {
        // Most common patterns (try many possibilities safely)
        const candidates = [
            sub?.videoUrl,
            sub?.videoURL,
            sub?.video,
            sub?.url,
            sub?.lectureVideo,
            sub?.videoUrl?.url,
            sub?.videoURL?.url,
            sub?.video?.url,
            sub?.videoUrl?.secure_url,
            sub?.videoURL?.secure_url,
            sub?.video?.secure_url,
            // sometimes the cloudinary url can be nested or stored under metadata
            sub?.videoUrl?.secureUrl,
            sub?.videoURL?.secureUrl,
            sub?.video?.secureUrl,
        ];

        for (const c of candidates) {
            const url = safeUrl(typeof c === "string" ? c : c?.url || c?.secure_url);
            if (url) return url;
        }
        return null;
    };

    const handlePickVideo = (sectionId, subsection) => {
        const url = extractVideoUrl(subsection);

        if (!url) {
            toast.error("Video URL not available for this lecture.");
            return;
        }

        setSelectedVideo({
            subsectionId: subsection._id,
            videoUrl: url,
            title: subsection.title,
            sectionId,
        });

        setExpandedSections((prev) => (prev.includes(sectionId) ? prev : [...prev, sectionId]));
    };

    const toggleCompleted = (subsectionId) => {
        setCompleted((prev) => ({
            ...prev,
            [subsectionId]: !prev[subsectionId],
        }));
    };

    const goToLecture = (offset) => {
        const targetIndex = currentLectureIndex + offset;
        const target = flatLectures[targetIndex];
        if (!target) return;
        const section = courseData?.courseContent?.find((s) => s._id === target.sectionId);
        const sub = section?.subSection?.find((s) => s._id === target.subsectionId);
        if (section && sub) handlePickVideo(section._id, sub);
    };

    // Purely visual toggle — does not touch any business/API state
    const toggleBookmark = (subsectionId) => {
        if (!subsectionId) return;
        setBookmarked((prev) => ({ ...prev, [subsectionId]: !prev[subsectionId] }));
    };

    const expandAllSections = () => {
        const allIds = (courseData?.courseContent || []).map((s) => s._id);
        setExpandedSections(allIds);
    };

    const collapseAllSections = () => {
        setExpandedSections([]);
    };

    if (loading) {
        return (
            <div className="vc-wrapper">
                <div className="vc-loader">
                    <div className="vc-spinner" />
                    <p>Loading course...</p>
                </div>
            </div>
        );
    }

    if (!courseData) {
        return (
            <div className="vc-wrapper">
                <div className="vc-empty">
                    <h2>Course details not found.</h2>
                    <p>Please go back and try again.</p>
                </div>
                <Footer />
            </div>
        );
    }

    const instructorInitials =
        `${courseData?.instructor?.firstname?.[0] || "I"}${courseData?.instructor?.lastname?.[0] || ""}`.toUpperCase();

    const allExpanded =
        (courseData?.courseContent || []).length > 0 &&
        expandedSections.length === (courseData?.courseContent || []).length;

    return (
        <div className="vc-wrapper">
            {/* ============================ SECTION 1 ============================ */}
            {/* TOP COURSE HEADER — full width premium header card */}
            <header className="vc-course-header">
                <button
                    type="button"
                    className="vc-go-back"
                    onClick={() => navigate("/dashboard", { state: { activePage: "enrolledCourses" } })}
                >
                    <Icon.ArrowLeft />
                    <span>Dashboard</span>
                </button>

                <div className="vc-header-main">
                    <div className="vc-header-icon">
                        <Icon.Film width="26" height="26" />
                    </div>

                    <div className="vc-header-info">
                        {/* <div className="vc-header-badges">
                            <span className="vc-badge vc-badge-category">
                                <Icon.Grid />
                                {courseData?.category?.name || "General"}
                            </span>
                            <span className="vc-badge vc-badge-difficulty">
                                <Icon.Trophy width="13" height="13" />
                                {courseData?.difficulty || "All Levels"}
                            </span>
                        </div> */}

                        <h1 className="vc-header-title">{courseData?.courseName}</h1>

                        <div className="vc-header-meta">
                            <span className="vc-header-meta-item">
                                <Icon.User />
                                {courseData?.instructor?.firstname} {courseData?.instructor?.lastname}
                            </span>
                            <span className="vc-header-meta-dot" />
                            <span className="vc-header-meta-item">
                                <Icon.Layers width="14" height="14" />
                                {courseData?.courseContent?.length || 0} sections
                            </span>
                            <span className="vc-header-meta-dot" />
                            <span className="vc-header-meta-item">
                                <Icon.Film width="14" height="14" />
                                {totalLectures} lectures
                            </span>
                        </div>
                    </div>
                </div>

                <div className="vc-header-progress">
                    <div className="vc-progress-ring vc-progress-ring-lg" style={{ "--vc-deg": `${progressPercent * 3.6}deg` }}>
                        <span>{progressPercent}%</span>
                    </div>
                    <div className="vc-header-progress-meta">
                        <span className="vc-header-progress-num">{completedCount}/{totalLectures}</span>
                        <span className="vc-header-progress-label">lectures complete</span>
                    </div>
                </div>
            </header>

            {/* ============================ SECTION 2 ============================ */}
            {/* MAIN LEARNING LAYOUT — left 70% / right 30% */}
            <div className="vc-main">
                {/* -------------------------- LEFT COLUMN -------------------------- */}
                <main className="vc-primary-col">

                    {/* Card 1 — VIDEO PLAYER */}
                    <section className="vc-video-card">
                        <div className="vc-player">
                            {selectedVideo?.videoUrl ? (
                                <video
                                    key={selectedVideo.subsectionId}
                                    className="vc-video"
                                    controls
                                    playsInline
                                    preload="metadata"
                                    src={selectedVideo.videoUrl}
                                />
                            ) : (
                                <div className="vc-video-placeholder">
                                    <div className="vc-video-placeholder-icon">
                                        <Icon.Play width="34" height="34" />
                                    </div>
                                    <div className="vc-video-placeholder-text">
                                        Choose a lecture from the course content.
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="vc-video-body">
                            <div className="vc-video-info-bar">
                                <div className="vc-video-info-left">
                                    {currentLectureIndex >= 0 && (
                                        <span className="vc-lecture-tag">
                                            Lecture {currentLectureIndex + 1} of {totalLectures}
                                        </span>
                                    )}
                                    <h2 className="vc-video-title">
                                        {selectedVideo?.title || "Select a lecture"}
                                    </h2>
                                </div>

                                {selectedVideo?.subsectionId ? (
                                    <label className={`vc-tick ${completed[selectedVideo.subsectionId] ? "checked" : ""}`}>
                                        <input
                                            type="checkbox"
                                            checked={!!completed[selectedVideo.subsectionId]}
                                            onChange={() => toggleCompleted(selectedVideo.subsectionId)}
                                        />
                                        <span className="vc-tick-box">
                                            <Icon.Check />
                                        </span>
                                        <span>{completed[selectedVideo.subsectionId] ? "Completed" : "Mark complete"}</span>
                                    </label>
                                ) : null}
                            </div>

                            <div className="vc-video-submeta">
                                <span className="vc-video-submeta-item">
                                    <Icon.Calendar />
                                    Published {courseData?.createdAt ? new Date(courseData.createdAt).toLocaleDateString() : "—"}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Card 2 — LECTURE INFORMATION */}
                    <section className="vc-info-card">
                        <h3 className="vc-card-heading">Lecture information</h3>
                        <div className="vc-info-title">{selectedVideo?.title || "Select a lecture to see details"}</div>
                        <p className="vc-info-desc">
                            {courseData?.courseDescription ||
                                "This lecture is part of the current course module. Watch the video, review the objectives below, and mark the lecture complete once you're finished."}
                        </p>

                        <div className="vc-info-grid">
                            <div className="vc-info-block">
                                <h4 className="vc-info-block-title">Learning objectives</h4>
                                <ul className="vc-bullet-list">
                                    {LEARNING_OBJECTIVES.map((item, i) => (
                                        <li key={i}>
                                            <span className="vc-bullet-icon">
                                                <Icon.Check />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="vc-info-block">
                                <h4 className="vc-info-block-title">Key takeaways</h4>
                                <ul className="vc-bullet-list">
                                    {KEY_TAKEAWAYS.map((item, i) => (
                                        <li key={i}>
                                            <span className="vc-bullet-icon vc-bullet-icon-accent">
                                                <Icon.CheckCircle width="13" height="13" />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Card 3 — LECTURE ACTIONS */}
                    <section className="vc-actions-card">
                        <div className="vc-actions-left">
                            <button
                                type="button"
                                className="vc-nav-btn"
                                disabled={currentLectureIndex <= 0}
                                onClick={() => goToLecture(-1)}
                            >
                                <Icon.Prev />
                                <span>Previous</span>
                            </button>
                            <button
                                type="button"
                                className="vc-nav-btn vc-nav-btn-primary"
                                disabled={currentLectureIndex < 0 || currentLectureIndex >= flatLectures.length - 1}
                                onClick={() => goToLecture(1)}
                            >
                                <span>Next lecture</span>
                                <Icon.Next />
                            </button>
                        </div>

                        <div className="vc-actions-right">
                            <button
                                type="button"
                                className={`vc-icon-btn ${selectedVideo?.subsectionId && bookmarked[selectedVideo.subsectionId] ? "active" : ""}`}
                                onClick={() => toggleBookmark(selectedVideo?.subsectionId)}
                                disabled={!selectedVideo?.subsectionId}
                                title="Bookmark this lecture"
                            >
                                <Icon.Bookmark
                                    fill={selectedVideo?.subsectionId && bookmarked[selectedVideo.subsectionId] ? "currentColor" : "none"}
                                />
                                <span>Bookmark</span>
                            </button>

                            {selectedVideo?.subsectionId ? (
                                <label className={`vc-tick vc-tick-solo ${completed[selectedVideo.subsectionId] ? "checked" : ""}`}>
                                    <input
                                        type="checkbox"
                                        checked={!!completed[selectedVideo.subsectionId]}
                                        onChange={() => toggleCompleted(selectedVideo.subsectionId)}
                                    />
                                    <span className="vc-tick-box">
                                        <Icon.Check />
                                    </span>
                                    <span>{completed[selectedVideo.subsectionId] ? "Completed" : "Mark complete"}</span>
                                </label>
                            ) : null}
                        </div>
                    </section>

                    {/* Card 4 — LEARNING TABS */}
                    <section className="vc-tabs-card">
                        <div className="vc-tabs-bar">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    className={`vc-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="vc-tabs-body">
                            {/* ---------------- OVERVIEW TAB ---------------- */}
                            {activeTab === "overview" && (
                                <div className="vc-tab-panel">
                                    <h4 className="vc-tab-panel-title">Lecture summary</h4>
                                    <p className="vc-tab-panel-text">
                                        {courseData?.courseDescription ||
                                            "A complete walkthrough of the concept covered in this lecture, with practical examples to reinforce your understanding."}
                                    </p>

                                    <h4 className="vc-tab-panel-title">What you will learn</h4>
                                    <ul className="vc-bullet-list">
                                        {LEARNING_OBJECTIVES.map((item, i) => (
                                            <li key={i}>
                                                <span className="vc-bullet-icon">
                                                    <Icon.Check />
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <h4 className="vc-tab-panel-title">Key concepts</h4>
                                    <div className="vc-concept-chips">
                                        {["Fundamentals", "Hands-on practice", "Best practices", "Common pitfalls"].map((c) => (
                                            <span key={c} className="vc-chip">{c}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ---------------- RESOURCES TAB (static placeholder) ---------------- */}
                            {activeTab === "resources" && (
                                <div className="vc-tab-panel">
                                    <h4 className="vc-tab-panel-title">Resources</h4>
                                    <div className="vc-resource-grid">
                                        {PLACEHOLDER_RESOURCES.map((res) => (
                                            <div key={res.id} className="vc-resource-card">
                                                <span className="vc-resource-icon">
                                                    <Icon.File />
                                                </span>
                                                <div className="vc-resource-meta">
                                                    <span className="vc-resource-name">{res.name}</span>
                                                    <span className="vc-resource-sub">{res.type} · {res.size}</span>
                                                </div>
                                                <button type="button" className="vc-resource-download" title="Download (placeholder)">
                                                    <Icon.Download />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ---------------- NOTES TAB (static placeholder) ---------------- */}
                            {activeTab === "notes" && (
                                <div className="vc-tab-panel">
                                    <h4 className="vc-tab-panel-title">Your notes</h4>
                                    <textarea
                                        className="vc-notes-area"
                                        placeholder="Write personal notes for this lecture..."
                                        rows={8}
                                        disabled
                                    />
                                    <p className="vc-tab-panel-hint">Notes are local to this view and not yet saved to your account.</p>
                                </div>
                            )}

                            {/* ---------------- DISCUSSION TAB (static placeholder) ---------------- */}
                            {activeTab === "discussion" && (
                                <div className="vc-tab-panel">
                                    <h4 className="vc-tab-panel-title">Discussion</h4>

                                    <div className="vc-discussion-list">
                                        {PLACEHOLDER_DISCUSSION.map((d) => (
                                            <div key={d.id} className="vc-discussion-item">
                                                <span className="vc-discussion-avatar">
                                                    {d.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                                                </span>
                                                <div className="vc-discussion-content">
                                                    <div className="vc-discussion-head">
                                                        <span className="vc-discussion-name">{d.name}</span>
                                                        <span className="vc-discussion-time">{d.time}</span>
                                                    </div>
                                                    <p className="vc-discussion-text">{d.message}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="vc-discussion-input-row">
                                        <input
                                            type="text"
                                            className="vc-discussion-input"
                                            placeholder="Ask a question or share a comment..."
                                            disabled
                                        />
                                        <button type="button" className="vc-discussion-send" disabled title="Coming soon">
                                            <Icon.Send />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ---------------- DOWNLOADS TAB (static placeholder) ---------------- */}
                            {activeTab === "downloads" && (
                                <div className="vc-tab-panel">
                                    <h4 className="vc-tab-panel-title">Downloadable resources</h4>
                                    <div className="vc-download-list">
                                        {PLACEHOLDER_DOWNLOADS.map((d) => (
                                            <div key={d.id} className="vc-download-row">
                                                <span className="vc-resource-icon">
                                                    <Icon.File />
                                                </span>
                                                <div className="vc-resource-meta">
                                                    <span className="vc-resource-name">{d.name}</span>
                                                    <span className="vc-resource-sub">{d.size}</span>
                                                </div>
                                                <button type="button" className="vc-download-btn" title="Download (placeholder)">
                                                    <Icon.Download />
                                                    <span>Download</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Card 5 — INSTRUCTOR SECTION */}
                    <section className="vc-instructor-card">
                        <div className="vc-instructor-avatar">{instructorInitials}</div>
                        <div className="vc-instructor-meta">
                            <div className="vc-instructor-name">
                                {courseData?.instructor?.firstname} {courseData?.instructor?.lastname}
                            </div>
                            <div className="vc-instructor-sub">Course instructor</div>
                            <p className="vc-instructor-bio">
                                {courseData?.instructor?.additionalDetails?.about ||
                                    "Experienced educator passionate about helping students build real-world, practical skills through this course."}
                            </p>
                            <div className="vc-instructor-stats">
                                <span className="vc-instructor-stat">
                                    <Icon.Layers width="14" height="14" />
                                    {courseData?.instructor?.courses?.length || 1} courses
                                </span>
                                <span className="vc-instructor-stat">
                                    <Icon.User />
                                    {courseData?.studentsEnrolled?.length || 0} students
                                </span>
                            </div>
                        </div>
                        <div className="vc-instructor-date">
                            <Icon.Calendar />
                            <span>
                                Published{" "}
                                {courseData?.createdAt ? new Date(courseData.createdAt).toLocaleDateString() : ""}
                            </span>
                        </div>
                    </section>
                </main>

                {/* -------------------------- RIGHT COLUMN -------------------------- */}
                <aside className="vc-content-col">
                    <div className="vc-content-card">
                        <div className="vc-content-head">
                            <div>
                                <h2 className="vc-content-title">Course content</h2>
                                <span className="vc-content-sub">
                                    {completedCount}/{totalLectures} lectures done
                                </span>
                            </div>
                            <div className="vc-content-ring" style={{ "--vc-deg": `${progressPercent * 3.6}deg` }}>
                                <span>{progressPercent}%</span>
                            </div>
                        </div>

                        <div className="vc-content-toolbar">
                            <button
                                type="button"
                                className="vc-expand-all-btn"
                                onClick={allExpanded ? collapseAllSections : expandAllSections}
                            >
                                {allExpanded ? "Collapse all" : "Expand all"}
                            </button>
                        </div>

                        <div className="vc-content-body">
                            {courseData?.courseContent?.map((section, sIdx) => {
                                const isOpen = expandedSections.includes(section._id);
                                const sectionLectureCount = section.subSection?.length || 0;
                                const sectionCompletedCount = (section.subSection || []).filter(
                                    (s) => completed[s._id]
                                ).length;
                                const sectionPct = sectionLectureCount
                                    ? Math.round((sectionCompletedCount / sectionLectureCount) * 100)
                                    : 0;

                                return (
                                    <div key={section._id} className={`vc-section ${isOpen ? "open" : ""}`}>
                                        <button
                                            type="button"
                                            className="vc-section-header"
                                            onClick={() => toggleSection(section._id)}
                                            aria-expanded={isOpen}
                                        >
                                            <span className="vc-section-index">{sIdx + 1}</span>
                                            <span className="vc-section-name-wrap">
                                                <span className="vc-section-name">{section.sectionName}</span>
                                                <span className="vc-section-meta">
                                                    {sectionCompletedCount}/{sectionLectureCount} done
                                                    <span className="vc-section-bar">
                                                        <span className="vc-section-bar-fill" style={{ width: `${sectionPct}%` }} />
                                                    </span>
                                                </span>
                                            </span>
                                            <span className={`vc-chevron ${isOpen ? "open" : ""}`}>
                                                <Icon.Chevron />
                                            </span>
                                        </button>

                                        {isOpen ? (
                                            <div className="vc-section-content">
                                                {(section.subSection || []).map((sub) => {
                                                    const url = safeUrl(
                                                        sub?.videoUrl ||
                                                        sub?.videoURL ||
                                                        sub?.video ||
                                                        sub?.url ||
                                                        sub?.lectureVideo ||
                                                        sub?.videoUrl?.url ||
                                                        sub?.videoURL?.url ||
                                                        sub?.video?.url ||
                                                        sub?.videoUrl?.secure_url ||
                                                        sub?.videoURL?.secure_url ||
                                                        sub?.video?.secure_url ||
                                                        sub?.videoUrl?.secureUrl ||
                                                        sub?.videoURL?.secureUrl ||
                                                        sub?.video?.secureUrl
                                                    );
                                                    const isSelected = selectedVideo?.subsectionId === sub._id;
                                                    const isDone = !!completed[sub._id];

                                                    return (
                                                        <div
                                                            key={sub._id}
                                                            className={`vc-subrow ${isSelected ? "selected" : ""} ${isDone ? "done" : ""}`}
                                                        >
                                                            <label className="vc-check vc-check-sub">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isDone}
                                                                    onChange={() => toggleCompleted(sub._id)}
                                                                />
                                                                <span className="vc-check-box">
                                                                    <Icon.Check />
                                                                </span>
                                                            </label>

                                                            <button
                                                                type="button"
                                                                className="vc-subrow-main"
                                                                onClick={() => handlePickVideo(section._id, sub)}
                                                                disabled={!url}
                                                                title={!url ? "Video URL not available" : undefined}
                                                            >
                                                                <span className="vc-play-mini">
                                                                    {isSelected ? <Icon.Play width="14" height="14" /> : <Icon.Play width="14" height="14" />}
                                                                </span>
                                                                <span className="vc-subrow-title">{sub.title}</span>
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </aside>
            </div>

            <Footer />
        </div>
    );
};

export default ViewCourse;