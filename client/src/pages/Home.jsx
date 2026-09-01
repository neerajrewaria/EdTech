import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import UnifiedHero from '../Components/core/HomePage/UnifiedHero';
import DynamicCourseMarquee from '../Components/core/HomePage/DynamicCourseMarquee';
import InteractiveProductJourney from '../Components/core/HomePage/InteractiveProductJourney';
import KineticTypographyBreak from '../Components/core/HomePage/KineticTypographyBreak';
import InteractiveEcosystem from '../Components/core/HomePage/InteractiveEcosystem';
import PlatformCapabilities from '../Components/core/HomePage/PlatformCapabilities';
import ClosingStage from '../Components/core/HomePage/ClosingStage';
import Footer from '../Components/Common/Footer';

import './Home.css';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="home-page">
      {/* Viewport Scroll Progress Bar */}
      <motion.div
        className="home-scroll-progress-bar"
        style={{ scaleX }}
      />

      {/* ACT I: Monumental Unified Hero with Ambient Light & Interactive Preview */}
      <UnifiedHero />

      {/* ACT II: Dual-Track Counter-Scrolling Course Showcase */}
      <DynamicCourseMarquee />

      {/* ACT III: Interactive Product Walkthrough (Discover -> Syllabus -> Cart -> Stream) */}
      <InteractiveProductJourney />

      {/* ACT IV: Editorial Kinetic Typography Break */}
      <KineticTypographyBreak />

      {/* ACT V: Persona Switcher (Student Journey vs Instructor Studio) */}
      <InteractiveEcosystem />

      {/* ACT VI: Sticky Stacking Platform Capabilities */}
      <PlatformCapabilities />

      {/* ACT VII: Closing Stage Portal */}
      <ClosingStage />

      {/* Global Application Footer */}
      <Footer />
    </div>
  );
};

export default Home;
