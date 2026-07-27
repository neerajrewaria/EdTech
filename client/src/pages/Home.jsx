import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import HighlightText from '../Components/core/HomePage/HighlightText';
import CTAButton from "../Components/core/HomePage/Button";
// banner video import removed — replaced by animated code-board in section1
import CodeBlocks from '../Components/core/HomePage/CodeBlocks';
import Timeline from '../Components/core/HomePage/Timeline';
import Language from '../Components/core/HomePage/Language';
import Instructor from '../Components/core/HomePage/Instructor';
import Footer from '../Components/Common/Footer';
import { motion } from "framer-motion";

import './Home.css';



const Home = () => {

  return (

    <div>
      {/*  section1*/}
      <div className="hero-section-bg">
      <div className="container"
>
        <Link to={"./signup"}>
          <div className="instructor-div">
            <div className="second-class">

              <HiSparkles className="instructor-sparkle-icon" />
              <p>Become an instructor</p>
              <div className="instructor-arrow-circle">
                <FaArrowRight />
              </div>
            </div>

          </div>

        </Link>

        <motion.div className="Empower-head"  
  initial={{
    opacity: 0,
    y: 50,
  }}
  animate={{
    opacity: 1,
    x: 0,
    y: 0,
  }}
  transition={{
    duration: 0.5}}
>
          Unlock Your Potential.
 
          <br />
          Build 
          <HighlightText text={"Future-Ready Skills"} />
          {/*  //we are sending  state as props to HighlightText component and it will be rendered there */}
        </motion.div>
        <motion.div className="Empower-para"
          initial={{
    opacity:0,
    y: 20,
    
  }}
  animate={{
    opacity: 1,
    x: 0,
    y: 0,
    
  }}
  transition={{delay:0.3,
    duration: 0.3}}>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </motion.div>

        <div className="CTA-BUTTON-DIV">
          <CTAButton active={true} linkto={"/signup"} >     {/* learn more is the childdren of ctabutton here */}
            <div className="cta-btn-content">
              Learn more
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            <div className="cta-btn-content">
              Book a Demo
              <FaArrowRight />
            </div>
          </CTAButton>

        </div>

        <div className="hero-stats-row">
          <div className="hero-stats-item">
            <HiUserGroup className="hero-stats-icon" />
            <p>50k+ learners</p>
          </div>
          <div className="hero-stats-item">
            <FaStar className="hero-stats-icon" />
            <p>4.9/5 average rating</p>
          </div>
          <div className="hero-stats-item">
            <HiSparkles className="hero-stats-icon" />
            <p>200+ expert-led courses</p>
          </div>
        </div>

        <div className='code-board-div'>
          <div className='code-board-window'>
            <div className='code-board-titlebar'>
              <span className='code-board-dot dot-red'></span>
              <span className='code-board-dot dot-yellow'></span>
              <span className='code-board-dot dot-green'></span>
            </div>
            <div className='code-board-screen'>
              <div className='code-board-inner-bar'>
                <span className='code-board-dot dot-green'></span>
                <span className='code-board-dot dot-green'></span>
                <span className='code-board-dot dot-blue'></span>
              </div>
              <pre className='code-board-lines'>
{`function Primitive() {
  const [state, setState] = useState();
  const [config, setConfig] = useState();

}

export default connectional(comp).render({
  render: (state) => {

    {
      return: composed(
        action: state.handle, modules
      );
    }

  }

  return: state(comp);
}`}
              </pre>
            </div>
          </div>
        </div>


        {/* code section 1 */}

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
      </div>


      {/*  section2*/}

      <div className='section2-main-div'>
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
