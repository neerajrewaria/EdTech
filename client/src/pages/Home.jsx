import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { HiOutlineRocketLaunch, HiOutlineBookOpen } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import EliteCurriculum from '../Components/core/HomePage/EliteCurriculum';
import Instructor from '../Components/core/HomePage/Instructor';
import Footer from '../Components/Common/Footer';
import { motion } from "framer-motion";
import Learningjourney from '../Components/core/HomePage/Learningjourney';


import './Home.css';



const Home = () => {

  return (

    <div className="home-page">
      {/*  section1 — HERO  */}
      <div className="hero-section-bg">
        <div className="container hero-container">

          {/* Eyebrow badge */}
          <motion.div
            className="hero-badge-pill"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <HiOutlineRocketLaunch className="hero-badge-icon" />
            <span>Next-Gen Engineering Platform</span>
          </motion.div>

          <div className="hero-body-row">
            {/* LEFT: heading / copy / CTAs */}
            <div className="hero-copy-col">
              <motion.h1
                className="hero-heading"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Architecting the
                <br />
                Future of
                <br />
                <span className="hero-heading-gradient">Intelligence.</span>
              </motion.h1>

              <motion.p
                className="hero-subcopy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                Elevate your career with project-based learning and AI-driven
                mentorship. Build real-world applications in production-grade
                environments designed for top-tier engineers.
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

            {/* RIGHT: AI mentor / code mock panel */}
            <motion.div
              className="hero-visual-col"
              initial={{ opacity: 0, x: 40, rotate: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="hero-mock-glow" aria-hidden="true" />

              <div className="hero-mock-panel">
                <div className="hero-mock-chat-header">
                  <span className="hero-mock-avatar">🤖</span>
                  <div className="hero-mock-header-text">
                    <p className="hero-mock-title">AI Mentor</p>
                    <p className="hero-mock-status">
                      <span className="hero-mock-status-dot" />
                      Online &ndash; Context Aware
                    </p>
                  </div>
                </div>

                <div className="hero-mock-bubble hero-mock-bubble-user">
                  Explain these lecture notes in detail and tell me what the
                  code is doing.
                </div>

                <div className="hero-mock-bubble hero-mock-bubble-ai">
                  Analyzing architecture&hellip; The provided Rust
                  implementation defines a{" "}
                  <code className="tok-fn">forward</code> pass for a Neural
                  Network. It leverages a functional{" "}
                  <code className="tok-fn">.fold()</code> pattern to
                  sequentially apply each{" "}
                  <code className="tok-kw">layer</code> to the input{" "}
                  <code className="tok-type">Tensor</code> x. This ensures a
                  clean, immutable transformation of data through the network
                  layers.
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
