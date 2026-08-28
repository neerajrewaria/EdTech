import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiClock, FiShield, FiActivity, FiTerminal, FiCpu } from 'react-icons/fi';
import { getAllCourses } from '../../../services/operations/courseDetailsAPI';
import { apiConnector } from '../../../services/apiconnector';
import { categories } from '../../../services/apis';

const fallbackCurriculum = [
  {
    _id: "zero-trust-cloud",
    courseName: "Zero-Trust Cloud Architecture",
    courseDescription: "Design resilient, distributed systems with military-grade security protocols for modern enterprise networks.",
    tag: ["AWS", "Terraform", "Kubernetes"],
    badge: "Mastery Track",
    icon: <FiShield />,
  },
  {
    _id: "realtime-data-pipeline",
    courseName: "Real-Time Data Streaming Pipelines",
    courseDescription: "Build high-throughput, low-latency streaming applications processing millions of events per second.",
    tag: ["Kafka", "Scala", "Flink"],
    badge: "System Design",
    icon: <FiActivity />,
  },
  {
    _id: "systems-programming-rust",
    courseName: "Systems Programming & Kernel Engineering",
    courseDescription: "Master memory safety without garbage collection. Build lightning-fast CLI tools and low-level network microservices.",
    tag: ["Rust", "WASM", "Tokio"],
    badge: "Core Systems",
    icon: <FiTerminal />,
  },
  {
    _id: "applied-deep-learning",
    courseName: "Applied Deep Learning Systems",
    courseDescription: "Architect and deploy scalable transformer models for NLP and computer vision tasks in production environments.",
    tag: ["PyTorch", "CUDA", "Docker"],
    badge: "Advanced AI",
    icon: <FiCpu />,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const CourseUniverse = () => {
  const [courses, setCourses] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCourses = await getAllCourses();
        if (fetchedCourses && fetchedCourses.length > 0) {
          setCourses(fetchedCourses);
        } else {
          setCourses(fallbackCurriculum);
        }

        const catRes = await apiConnector("GET", categories.CATEGORIES_API);
        if (catRes?.data?.data) {
          setCategoriesList(catRes.data.data);
        }
      } catch (err) {
        setCourses(fallbackCurriculum);
      }
    };

    fetchData();
  }, []);

  const displayCourses = courses.length > 0 ? courses.slice(0, 6) : fallbackCurriculum;

  return (
    <section id="curriculum" className="ncodex-course-universe">
      <div className="section-header-flex">
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nx-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Production-Ready Curriculum
          </span>
          <h2 className="nx-section-title" style={{ marginTop: '8px' }}>
            Explore Featured <span className="nx-gradient-text">Engineering Tracks</span>
          </h2>
        </div>

        {categoriesList.length > 0 ? (
          <Link to={`/catalog/${categoriesList[0]._id}`} className="nx-btn nx-btn-secondary">
            <span>Explore Full Catalog</span>
            <FiArrowUpRight />
          </Link>
        ) : (
          <Link to="/signup" className="nx-btn nx-btn-secondary">
            <span>Explore Full Catalog</span>
            <FiArrowUpRight />
          </Link>
        )}
      </div>

      <motion.div 
        className="course-grid-editorial"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {displayCourses.map((course, idx) => {
          const tags = Array.isArray(course.tag) ? course.tag : (course.tag ? JSON.parse(course.tag || '[]') : ["Engineering", "Hands-on"]);
          const courseId = course._id || idx;

          return (
            <motion.div key={courseId} variants={fadeUp}>
              <Link 
                to={course._id ? `/courses/${course._id}` : `/signup`}
                className="course-card-premium"
              >
                <div>
                  <span className="course-card-badge">
                    {course.badge || "Featured Track"}
                  </span>
                  
                  <h3 className="course-card-title">
                    {course.courseName || course.title}
                  </h3>

                  <p className="course-card-desc">
                    {course.courseDescription || course.description}
                  </p>

                  <div className="course-card-tags">
                    {tags.map((t, i) => (
                      <span key={i} className="course-tag-chip">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="course-card-footer">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiClock /> {course.duration || "Guided Track"}
                  </span>
                  
                  <div className="course-explore-arrow">
                    <FiArrowUpRight />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default CourseUniverse;
