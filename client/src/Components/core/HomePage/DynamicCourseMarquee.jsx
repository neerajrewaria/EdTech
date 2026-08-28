import React, { useEffect, useState } from 'react';
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
  // Duplicate for seamless infinite loop
  const marqueeItems = displayList.concat(displayList);

  return (
    <section id="courses-marquee" className="ncodex-marquee-section">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Explore Featured Curriculum
        </span>
        <h2 className="nx-section-heading" style={{ marginTop: '4px' }}>
          Job-Ready <span className="nx-gradient-brand">Course Showcase</span>
        </h2>
      </div>

      <div className="marquee-track-container">
        {marqueeItems.map((course, idx) => (
          <Link
            key={`${course._id}-${idx}`}
            to={course._id ? `/courses/${course._id}` : `/signup`}
            className="marquee-course-card"
          >
            <div>
              <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '99px', background: 'rgba(99,102,241,0.12)', color: 'var(--accent)', marginBottom: '12px', border: '1px solid rgba(99,102,241,0.25)' }}>
                {course.badge || "Featured Course"}
              </span>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', lineHeight: '1.3' }}>
                {course.courseName || course.title}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
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
        ))}
      </div>
    </section>
  );
};

export default DynamicCourseMarquee;
