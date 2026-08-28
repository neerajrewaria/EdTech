import React from 'react';
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
  return (
    <div className="home-page">
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
