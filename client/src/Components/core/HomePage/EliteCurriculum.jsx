import React from "react";
import {
  FiShield,
  FiActivity,
  FiTerminal,
  FiCpu,
  FiClock,
  FiArrowRight,
  FiArrowUpRight,
  FiCompass,
} from "react-icons/fi";
import "./EliteCurriculum.css";

/* ------------------------------------------------------------------
   PLACEHOLDER DATA — matches the reference image exactly for now.
   Swap this array (or wire it to an API call) once real course
   details are provided; the card markup below reads only from here,
   so no structural changes will be needed.
------------------------------------------------------------------ */
const curriculumData = [
  {
    id: "zero-trust-cloud",
    icon: <FiShield />,
    accent: "cyan",
    badge: "Master",
    title: "Zero-Trust Cloud Architecture",
    description:
      "Design resilient, distributed systems with military-grade security protocols for modern enterprise networks.",
    tags: ["AWS", "Terraform", "K8s"],
    duration: "8 Weeks",
  },
  {
    id: "realtime-data-pipeline",
    icon: <FiActivity />,
    accent: "lime",
    badge: "Intermediate",
    title: "Real-time Data Streaming Pipeline",
    description:
      "Build high-throughput, low-latency streaming applications processing millions of events per second.",
    tags: ["Kafka", "Scala", "Flink"],
    duration: "10 Weeks",
  },
  {
    id: "systems-programming-rust",
    icon: <FiTerminal />,
    accent: "sky",
    badge: "Core",
    title: "Systems Programming in Rust",
    description:
      "Master memory safety without garbage collection. Build lightning-fast CLI tools and network services.",
    tags: ["Rust", "WASM", "Tokio"],
    duration: "6 Weeks",
  },
  {
    id: "applied-deep-learning",
    icon: <FiCpu />,
    accent: "magenta",
    badge: "Advanced",
    title: "Applied Deep Learning Systems",
    description:
      "Architect and deploy scalable transformer models for NLP and computer vision tasks in production.",
    tags: ["PyTorch", "CUDA", "Docker"],
    duration: "12 Weeks",
  },
];

/* Small helper so the exact same card markup is reused for both the
   original set and the duplicated set below — keeps everything in
   sync with zero risk of the two copies drifting apart. */
const renderCard = (course, keySuffix = "") => (
  <article
    className={`ec-card ec-card--${course.accent}`}
    key={`${course.id}${keySuffix}`}
  >
    <div className="ec-card-top">
      <span className={`ec-icon-box ec-icon-${course.accent}`}>
        {course.icon}
      </span>
      <span className="ec-badge">{course.badge}</span>
    </div>

    <h3 className="ec-card-title">{course.title}</h3>
    <p className="ec-card-desc">{course.description}</p>

    <div className="ec-tag-row">
      {course.tags.map((tag) => (
        <span className="ec-tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>

    <div className="ec-card-footer">
      <span className="ec-duration">
        <FiClock />
        {course.duration}
      </span>
      <span className="ec-card-arrow" aria-hidden="true">
        <FiArrowRight />
      </span>
    </div>
  </article>
);

const EliteCurriculum = () => {
  return (
    <section className="ec-section">
      <div className="ec-container">
        {/* ---------- Header row ---------- */}
        <div className="ec-header-row">
          <div className="ec-header-text">
            <h2 className="ec-heading">
              Elite <span className="ec-heading-accent">Curriculum</span>
            </h2>
            <p className="ec-subheading">
              Master in-demand skills through rigorous, production-simulated
              environments.
            </p>
          </div>

          <button type="button" className="ec-catalog-btn">
            <span>View Full Catalog</span>
            <FiArrowUpRight />
          </button>
        </div>

        {/* ---------- Card marquee ----------
            Same cards, same data, same props. The list is rendered
            twice back-to-back inside a clipped viewport so the
            leftward scroll can loop seamlessly at the halfway point. */}
        <div className="ec-marquee-viewport">
          <div className="ec-grid ec-marquee-track">
            {curriculumData.map((course) => renderCard(course))}
            {curriculumData.map((course) => renderCard(course, "-dup"))}
          </div>
        </div>

        {/* ---------- Floating explore pill ---------- */}
        <div className="ec-floating-pill-wrap">
          <button type="button" className="ec-floating-pill">
            <FiCompass />
            <span>Explore Catalog</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default EliteCurriculum;
