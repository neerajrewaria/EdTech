import React, { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect';
import { FaArrowRight } from "react-icons/fa6";
import { HiOutlineBookOpen, HiOutlinePlayCircle, HiOutlineSparkles } from "react-icons/hi2";
import { FiCheck, FiChevronRight, FiCode, FiSend } from "react-icons/fi";
import { Link } from 'react-router-dom';
import EliteCurriculum from '../Components/core/HomePage/EliteCurriculum';
import Instructor from '../Components/core/HomePage/Instructor';
import Footer from '../Components/Common/Footer';
import { motion } from "framer-motion";
import Learningjourney from '../Components/core/HomePage/Learningjourney';


import './Home.css';

const demoSteps = [
  { label: 'Choose what to learn', title: 'Pick a job-ready course', eyebrow: 'Start learning', course: 'System Design Foundations', detail: '12 guided lessons | Learn at your own pace', accent: 'course' },
  { label: 'Watch and practise', title: 'Learn one lesson at a time', eyebrow: 'Follow the course', course: 'Designing reliable APIs', detail: '18 min left | Your progress is saved', accent: 'lecture' },
  { label: 'Stuck on a topic?', title: 'Ask an instructor anytime', eyebrow: 'Get help when you need it', course: 'Why do we use a load balancer here?', detail: 'Practical guidance tailored to your course', accent: 'question' },
  { label: 'Clear help, right away', title: 'Understand the answer', eyebrow: 'Instructor-led review', course: 'It shares traffic so your app stays fast and reliable.', detail: 'A concise explanation with real examples', accent: 'answer' },
];

const LearningDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = window.setInterval(() => setActiveStep((current) => (current + 1) % demoSteps.length), 2800);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const step = demoSteps[activeStep];
  const resumeDemo = () => {
    setActiveStep((current) => (current + 1) % demoSteps.length);
    setIsPaused(false);
  };

  return (
    <div
      className="learning-demo"
      aria-label="Animated NCodeX learning journey preview"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={resumeDemo}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="learning-demo-topbar">
        <div className="learning-demo-brand"><span className="learning-demo-mark"><FiCode /></span><span>NCodeX Learning</span></div>
        <span className="learning-demo-live"><i /> See how it works</span>
      </div>
      <div className="learning-demo-progress" aria-hidden="true">
        {demoSteps.map((item, index) => <span key={item.eyebrow} className={index <= activeStep ? 'is-complete' : ''} />)}
      </div>
      <div className="learning-demo-screen" key={step.eyebrow}>
        <div className="learning-demo-screen-copy"><p className="learning-demo-eyebrow">{step.eyebrow}</p><h2>{step.title}</h2></div>
        {step.accent === 'course' && <div className="demo-course-card"><span className="demo-course-icon"><HiOutlineBookOpen /></span><div><strong>{step.course}</strong><small>{step.detail}</small></div><FiChevronRight /></div>}
        {step.accent === 'lecture' && <div className="demo-lecture-card"><div className="demo-video-preview"><HiOutlinePlayCircle /><span>12:48</span></div><strong>{step.course}</strong><div className="demo-progress-line"><span /></div><small>{step.detail}</small></div>}
        {step.accent === 'question' && <div className="demo-question-card"><p>{step.course}</p><div><span>Ask an instructor</span><FiSend /></div><small>{step.detail}</small></div>}
        {step.accent === 'answer' && <div className="demo-answer-card"><span className="demo-answer-icon"><HiOutlineSparkles /></span><p>{step.course}</p><small><FiCheck /> {step.detail}</small></div>}
      </div>
      <div className="learning-demo-steps">
        {demoSteps.map((item, index) => <button type="button" key={item.eyebrow} className={index === activeStep ? 'is-active' : ''} onClick={() => setActiveStep(index)} aria-label={`Show ${item.title}`}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</button>)}
      </div>
    </div>
  );
};



const Home = () => {
  // Replaced custom typing logic with `typewriter-effect` component below

  return (

    <div className="home-page">
      {/*  section1 — HERO  */}
      <div className="hero-section-bg">
        <div className="container hero-container">

          {/* Eyebrow badge */}
          {/* <motion.div
            className="hero-badge-pill"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <HiOutlineRocketLaunch className="hero-badge-icon" />
            <span>Next-Gen Engineering Platform</span>
          </motion.div> */}

          <div className="hero-body-row">
            {/* LEFT: heading / copy / CTAs */}
            <div className="hero-copy-col">
              <motion.h1
                className="hero-heading"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Learn with confidence.
                <br />
                <span className="hero-heading-gradient">Grow&nbsp;
                  <span className="typed">
                    <Typewriter
                      options={{
                        strings: ['as student', 'as instructor'],
                        autoStart: true,
                        loop: true,
                        speed: 80,
                        delay: 120,
                        deleteSpeed: 100,
                        pauseFor: 1200,
                        cursor: '',
                      }}
                    />
                    <span className="custom-typed-cursor" aria-hidden="true"></span>
                  </span>
                </span>
              </motion.h1>

              <motion.p
                className="hero-subcopy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                Build career-ready tech skills with instructor-led courses,
                practical projects, and study support designed for learners and
                educators.
              </motion.p>

              <motion.div
                className="hero-cta-row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                <Link to="/signup" className="hero-btn-primary">
                  <span>Enter Academy</span>
                  <FaArrowRight />
                </Link>

                <a href="#curriculum" className="hero-btn-secondary">
                  <HiOutlineBookOpen />
                  <span>View Curriculum</span>
                </a>
              </motion.div>
            </div>

            {/* RIGHT: animated learning journey demo */}
            <motion.div
              className="hero-visual-col"
              initial={{ opacity: 0, x: 40, rotate: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="hero-mock-glow" aria-hidden="true" />
              <LearningDemo />

              <div className="hero-mock-panel hero-mock-panel-legacy" aria-hidden="true">
                <div className="hero-mock-chat-header">
                  <span className="hero-mock-avatar">👩‍🏫</span>
                  <div className="hero-mock-header-text">
                    <p className="hero-mock-title">Instructor Review</p>
                    <p className="hero-mock-status">
                      <span className="hero-mock-status-dot" />
                      Real-time course feedback
                    </p>
                  </div>
                </div>

                <div className="hero-mock-bubble hero-mock-bubble-user">
                  Explain these lecture notes in detail and tell me what the
                  code is doing.
                </div>

                <div className="hero-mock-bubble hero-mock-bubble-response">
                  The Rust implementation defines a <code className="tok-fn">forward</code>
                  pass for a neural network. It uses <code className="tok-fn">.fold()</code>
                  to apply each <code className="tok-kw">layer</code> to the input
                  <code className="tok-type">Tensor</code>, creating a clean,
                  production-ready data flow through the model.
                </div>

                <div className="hero-mock-code-window">
                  <div className="hero-mock-code-tab">
                    <span className="hero-mock-code-tab-name">network.rs</span>
                  </div>
                  <pre className="hero-mock-code-body">
                    <span className="tok-kw">impl</span>{" "}
                    <span className="tok-type">Network</span> {"{"}
                    {"\n"}
                    {"    "}
                    <span className="tok-kw">pub fn</span>{" "}
                    <span className="tok-fn">forward</span>
                    {"(&self, x: "}
                    <span className="tok-type">Tensor</span>
                    {") -> "}
                    <span className="tok-type">Tensor</span> {"{"}
                    {"\n"}
                    {"        self.layers.iter().fold(x, |acc, layer| layer.apply(acc))"}
                    {"\n"}
                    {"    }"}
                    {"\n"}
                    {"}"}
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>


      {/* Elite Curriculum — placeholder card data for now, swap once real course details are provided */}
      <EliteCurriculum />

      <Learningjourney />



      {/*  section2*/}

      <div className='section2-main-div' id="curriculum">


        {/*  section3*/}
        <Instructor></Instructor>
      </div>




      <Footer></Footer>




    </div>
  )
}

export default Home;
