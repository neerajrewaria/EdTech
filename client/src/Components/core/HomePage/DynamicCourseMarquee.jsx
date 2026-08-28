import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiClock } from 'react-icons/fi';
import { getAllCourses } from '../../../services/operations/courseDetailsAPI';

const fallbackMarqueeCourses = [
  {
    _id: "course-1",
    courseName: "Full-Stack Web Engineering",
    courseDescription: "Master modern React, Node.js, Express, and database architecture from scratch.",
    badge: "Web Dev",
    duration: "Self-Paced Track"
  },
  {
    _id: "course-2",
    courseName: "Cloud Systems & DevOps Engineering",
    courseDescription: "Learn containerization, microservice architecture, CI/CD pipelines, and cloud scaling.",
    badge: "Cloud Spec",
    duration: "Guided Track"
  },
  {
    _id: "course-3",
    courseName: "Systems Programming & Architecture",
    courseDescription: "Understand low-level memory allocation, concurrency models, and network protocols.",
    badge: "Core Systems",
    duration: "Self-Paced Track"
  },
  {
    _id: "course-4",
    courseName: "Data Engineering & Pipelines",
    courseDescription: "Construct high-throughput data processing workflows, ETL pipelines, and warehouse systems.",
    badge: "Data Track",
    duration: "Self-Paced Track"
  }
];

const DynamicCourseMarquee = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const result = await getAllCourses();
        if (result && result.length > 0) {
          setCourses(result);
        } else {
          setCourses(fallbackMarqueeCourses);
        }
      } catch (e) {
        setCourses(fallbackMarqueeCourses);
      }
    };
    loadCourses();
  }, []);

  const displayList = courses.length > 0 ? courses : fallbackMarqueeCourses;
  
  // Create two distinct arrays for top (Right) and bottom (Left) tracks
  const topTrackItems = displayList.concat(displayList);
  const bottomTrackItems = [...displayList].reverse().concat([...displayList].reverse());

  return (
    <section id="courses-marquee" className="ncodex-marquee-section">
      <motion.div 
        style={{ textAlign: 'center', marginBottom: '40px' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Explore Featured Curriculum
        </span>
        <h2 className="nx-section-heading" style={{ marginTop: '4px' }}>
          Job-Ready <span className="nx-gradient-brand">Course Showcase</span>
        </h2>
      </motion.div>

      <div className="marquee-double-stack">
        {/* TOP TRACK: LEFT TO RIGHT */}
        <div className="marquee-track-container-right">
          {topTrackItems.map((course, idx) => (
            <motion.div
              key={`top-${course._id}-${idx}`}
              className="marquee-card-motion-wrapper"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            >
              <Link
                to={course._id ? `/courses/${course._id}` : `/signup`}
                className="marquee-course-card"
              >
                <div>
                  <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '99px', background: 'rgba(99,102,241,0.12)', color: 'var(--accent)', marginBottom: '12px', border: '1px solid rgba(99,102,241,0.25)' }}>
                    {course.badge || "Featured Track"}
                  </span>

                  <h3 className="marquee-course-title">
                    {course.courseName || course.title}
                  </h3>

                  <p className="marquee-course-desc">
                    {course.courseDescription ? (course.courseDescription.length > 90 ? `${course.courseDescription.substring(0, 90)}...` : course.courseDescription) : "Complete self-paced curriculum."}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiClock /> {course.duration || "Self-Paced"}
                  </span>
                  <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                    View Course <FiArrowUpRight />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM TRACK: RIGHT TO LEFT */}
        <div className="marquee-track-container-left">
          {bottomTrackItems.map((course, idx) => (
            <motion.div
              key={`bottom-${course._id}-${idx}`}
              className="marquee-card-motion-wrapper"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            >
              <Link
                to={course._id ? `/courses/${course._id}` : `/signup`}
                className="marquee-course-card"
              >
                <div>
                  <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '99px', background: 'rgba(56,189,248,0.12)', color: 'var(--accent)', marginBottom: '12px', border: '1px solid rgba(56,189,248,0.25)' }}>
                    {course.badge || "Specialization"}
                  </span>

                  <h3 className="marquee-course-title">
                    {course.courseName || course.title}
                  </h3>

                  <p className="marquee-course-desc">
                    {course.courseDescription ? (course.courseDescription.length > 90 ? `${course.courseDescription.substring(0, 90)}...` : course.courseDescription) : "Complete self-paced curriculum."}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiClock /> {course.duration || "Self-Paced"}
                  </span>
                  <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                    Explore Track <FiArrowUpRight />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicCourseMarquee;
