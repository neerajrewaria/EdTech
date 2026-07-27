import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighlightText from '../Components/core/HomePage/HighlightText';
import CTAButton from "../Components/core/HomePage/Button";
import banner from "../assests/Images/banner.mp4";
import CodeBlocks from '../Components/core/HomePage/CodeBlocks';
import Timeline from '../Components/core/HomePage/Timeline';
import Language from '../Components/core/HomePage/Language';
import Instructor from '../Components/core/HomePage/Instructor';
import Footer from '../Components/Common/Footer';





const Home = () => {

  return (

    <div>
      {/*  section1*/}
      <div className="container">
        <Link to={"./signup"}>
          <div className="instructor-div">
            <div className="second-class">


              <p>Become an instructor</p>
              <FaArrowRight></FaArrowRight>
            </div>

          </div>

        </Link>

        <div className="Empower-head">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
          {/*  //we are sending  state as props to HighlightText component and it will be rendered there */}
        </div>
        <div className="Empower-para">
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className="CTA-BUTTON-DIV">
          <CTAButton active={true} linkto={"/signup"} >     {/* learn more is the childdren of ctabutton here */}
            Learn more
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>

        </div>
        <div className='video-div'>
          <video muted autoPlay loop>
            <source src={banner} type='video/mp4'>
            </source>
          </video>
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
            codecolor={"#facc15"}
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
          
          <div className="skills-callout-panel-btn-group">
            <CTAButton active={true} linkto={"/signup"}>
              Explore Learning Paths
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