import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { HiOutlineRocketLaunch, HiOutlineBookOpen } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import HighlightText from '../Components/core/HomePage/HighlightText';
import CTAButton from "../Components/core/HomePage/Button";
import CodeBlocks from '../Components/core/HomePage/CodeBlocks';
import EliteCurriculum from '../Components/core/HomePage/EliteCurriculum';
import Timeline from '../Components/core/HomePage/Timeline';
import Language from '../Components/core/HomePage/Language';
import Instructor from '../Components/core/HomePage/Instructor';
import Footer from '../Components/Common/Footer';
import { motion } from "framer-motion";


import './Home.css';



const Home = () => {

  return (

    <div>
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


      {/* code section 1 */}
      <div className="container">
        <div>
          <CodeBlocks
            position={"row"}
            heading={
              <div className='code-block-section1-head' >
                Unlock your
                <HighlightText text={"coding potential"} />
                <br></br>
                with our online courses.
              </div>
            }

            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1={
              {
                active: true,
                text: "try it yourself",
                linkto: "/signup"

              }
            }

            ctabtn2={
              {
                active: false,
                text: "learn more",
                linkto: "/login",


              }
            }

            codeblock={`<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav><a href="one/">One</a><a href="three/">Three</a></nav>
</body>
</html>`}
            codecolor={"#C4A52B"}
          />
        </div>



        {/* code section 2 */}
        <div>
          <CodeBlocks
            position={"row-reverse"}
            heading={
              <div className='code-block-section1-head' >
                Start
                <HighlightText
                  text={
                    <>
                      coding <br /> in seconds
                    </>
                  }
                />

              </div>
            }

            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            ctabtn1={
              {
                active: true,
                text: "Continue Lesson",
                linkto: "/login"

              }
            }

            ctabtn2={
              {
                active: false,
                text: "learn more",
                linkto: "/signup",


              }
            }

            codeblock={`<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav><a href="one/">One</a><a href="three/">Three</a></nav>
</body>
</html>`}
            codecolor={"#71a5f3"}
          />

        </div>
      </div>


      {/*  section2*/}

      <div className='section2-main-div' id="curriculum">
        <div className='background-rhombus-image' style={{ height: "333px" }}>

          <div className='div-after-background-image'>
            <div className='extra-div-for-margin' style={{ marginTop: "100px" }}></div>
            <div className='CTA-BUTTON-DIV'>
              <CTAButton active={true} linkto={"/signup"}>
                <div className='hello' style={{ display: 'flex', flexDirection: "row", alignItems: "center", gap: "10px" }}>
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                Learn more
              </CTAButton>
            </div>
          </div>
        </div>


    <div className="skills-callout-panel-root">
      <div className="skills-callout-panel-container">
        
        {/* LEFT COLUMN: Immersive Typographic Heading */}
        <div className="skills-callout-panel-title-side">
          <h2 className="skills-callout-panel-heading">
            Acquire the core engineering skillsets required for a{' '}
            <span className="skills-callout-panel-highlight-wrap">
              <HighlightText text={<>career that is in high demand.</>} />
            </span>
          </h2>
        </div>

        {/* RIGHT COLUMN: Professional Copy & Isolated CTA Button */}
        <div className="skills-callout-panel-action-side">
          <p className="skills-callout-panel-description">
            The modern technology landscape evolves continuously, setting higher performance bars. 
            Staying competitive as a software specialist now demands rapid adaptability, systems-level 
            thinking, and practical project deployment expertise alongside baseline coding fundamentals.
          </p>
          
          <div className="CTA-BUTTON-DIV">
             <CTAButton active={true} linkto={"/login"}>
            <div className="cta-btn-content">
              Explore Learning Path
              <FaArrowRight />
            </div>
          </CTAButton>
          </div>
        </div>

      </div>
    </div>





        <Timeline></Timeline>
        <Language></Language>


        {/*  section3*/}
        <Instructor></Instructor>
         </div>

         
      

      <Footer></Footer>




    </div>
  )
}

export default Home;
