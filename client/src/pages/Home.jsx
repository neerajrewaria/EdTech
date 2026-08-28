import React from 'react';
import UnifiedHero from '../Components/core/HomePage/UnifiedHero';
import DynamicCourseMarquee from '../Components/core/HomePage/DynamicCourseMarquee';
import InteractiveEcosystem from '../Components/core/HomePage/InteractiveEcosystem';
import PlatformCapabilities from '../Components/core/HomePage/PlatformCapabilities';
import ClosingStage from '../Components/core/HomePage/ClosingStage';
import Footer from '../Components/Common/Footer';

import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* 1. Unified Layered Hero with Floating Physics */}
      <UnifiedHero />

      {/* 2. Continuous Moving Course Showcase (Right to Left Marquee) */}
      <DynamicCourseMarquee />

      {/* 3. Interactive Ecosystem Switcher (Student vs Instructor Journey) */}
      <InteractiveEcosystem />

      {/* 4. Elevated Depth Platform Capabilities */}
      <PlatformCapabilities />

      {/* 5. Closing Brand Stage CTA */}
      <ClosingStage />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default Home;
