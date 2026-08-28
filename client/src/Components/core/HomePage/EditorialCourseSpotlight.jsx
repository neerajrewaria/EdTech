import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiClock, FiShield, FiActivity, FiTerminal, FiCpu } from 'react-icons/fi';
import { getAllCourses } from '../../../services/operations/courseDetailsAPI';
import { apiConnector } from '../../../services/apiconnector';
import { categories } from '../../../services/apis';

const fallbackSpotlights = [
  {
    _id: "zero-trust-cloud",
    courseName: "Zero-Trust Cloud & Microservices Architecture",
    courseDescription: "Architect mission-critical distributed systems with automated Terraform infrastructure and Kubernetes failover protocols.",
    tag: ["AWS", "Terraform", "Kubernetes"],
    badge: "Mastery Track",
    duration: "8 Weeks",
    icon: <FiShield />,
  },
  {
    _id: "realtime-data-pipeline",
    courseName: "High-Throughput Streaming Engine Pipelines",
    courseDescription: "Build real-time streaming architectures capable of processing hundreds of thousands of events per second using Apache Kafka and Rust.",
    tag: ["Kafka", "Scala", "Flink"],
    badge: "System Design",
    duration: "10 Weeks",
    icon: <FiActivity />,
  },
  {
    _id: "systems-programming-rust",
    courseName: "Kernel Engineering & Low-Level Systems",
    courseDescription: "Master memory safety without garbage collection. Construct high-speed CLI tools, custom protocols, and WASM modules.",
    tag: ["Rust", "WASM", "Tokio"],
    badge: "Core Systems",
    duration: "6 Weeks",
    icon: <FiTerminal />,
  },
  {
    _id: "applied-deep-learning",
    courseName: "Production Deep Learning & Model Ops",
    courseDescription: "Deploy transformer models, optimize CUDA memory usage, and engineer containerized AI inference servers at scale.",
    tag: ["PyTorch", "CUDA", "Docker"],
    badge: "Advanced AI",
    duration: "12 Weeks",
    icon: <FiCpu />,
  },
];

const EditorialCourseSpotlight = () => {
  const [courses, setCourses] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetched = await getAllCourses();
        if (fetched && fetched.length > 0) {
          setCourses(fetched);
        } else {
          setCourses(fallbackSpotlights);
        }

        const catRes = await apiConnector("GET", categories.CATEGORIES_API);
        if (catRes?.data?.data) {
          setCategoryList(catRes.data.data);
        }
      } catch (e) {
        setCourses(fallbackSpotlights);
      }
    };
    fetchData();
  }, []);

  const displayList = courses.length > 0 ? courses.slice(0, 5) : fallbackSpotlights;

  return (
    <section id="spotlight" className="ncodex-editorial-courses">
      <div style={{ marginBottom: '60px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nx-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Act II / Production Curriculum
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 4vw, 4rem)', fontWeight: '800', marginTop: '8px', textTransform: 'uppercase' }}>
          Editorial <span style={{ color: 'var(--nx-cyan)' }}>Course Spotlight</span>
        </h2>
      </div>

      <div className="editorial-layout-grid">
        
        {/* Sticky Left Navigation Bar */}
        <div className="sticky-category-nav">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--nx-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            Filter by Domain
          </span>

          {categoryList.length > 0 ? (
            categoryList.map((cat, idx) => (
              <button
                key={cat._id}
                type="button"
                className={`category-nav-item ${idx === activeCategoryIdx ? 'is-active' : ''}`}
                onClick={() => setActiveCategoryIdx(idx)}
              >
                {cat.name}
              </button>
            ))
          ) : (
            ['Cloud Architecture', 'System Design', 'Core Systems', 'Applied AI'].map((name, idx) => (
              <button
                key={name}
                type="button"
                className={`category-nav-item ${idx === activeCategoryIdx ? 'is-active' : ''}`}
                onClick={() => setActiveCategoryIdx(idx)}
              >
                {name}
              </button>
            ))
          )}

          <div style={{ marginTop: '32px' }}>
            {categoryList.length > 0 ? (
              <Link to={`/catalog/${categoryList[activeCategoryIdx]?._id || categoryList[0]._id}`} className="nx-pill-btn nx-pill-btn-outline" style={{ fontSize: '0.85rem', padding: '12px 24px' }}>
                <span>Explore Full Category</span>
                <FiArrowUpRight />
              </Link>
            ) : (
              <Link to="/signup" className="nx-pill-btn nx-pill-btn-outline" style={{ fontSize: '0.85rem', padding: '12px 24px' }}>
                <span>Explore All Tracks</span>
                <FiArrowUpRight />
              </Link>
            )}
          </div>
        </div>

        {/* Right Inspection Cards */}
        <div>
          {displayList.map((course, idx) => {
            const courseId = course._id || idx;
            const tags = Array.isArray(course.tag) ? course.tag : (course.tag ? JSON.parse(course.tag || '[]') : ["Hands-on Lab", "System Spec"]);

            return (
              <motion.div
                key={courseId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Link 
                  to={course._id ? `/courses/${course._id}` : `/signup`}
                  className="course-spotlight-card"
                >
                  <span className="course-spotlight-tag">
                    Track 0{idx + 1} — {course.badge || "Core Specialization"}
                  </span>

                  <h3 className="course-spotlight-title">
                    {course.courseName || course.title}
                  </h3>

                  <p className="course-spotlight-desc">
                    {course.courseDescription || course.description}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {tags.map((t, i) => (
                      <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '4px 10px', background: 'var(--nx-surface-alt)', border: '1px solid var(--nx-border)', color: 'var(--nx-text-muted)', borderRadius: '4px' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="course-meta-row">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FiClock /> {course.duration || "Guided Track"}
                    </span>
                    <span style={{ color: 'var(--nx-cyan)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                      Inspect Syllabus <FiArrowUpRight />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EditorialCourseSpotlight;
