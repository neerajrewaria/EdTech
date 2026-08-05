import React from 'react';
import HeroSection from '../Components/core/HomePage/HeroSection';
import PlatformSection from '../Components/core/HomePage/PlatformSection';
import LearningPathSection from '../Components/core/HomePage/LearningPathSection';
import Timeline from '../Components/core/HomePage/Timeline';
import Language from '../Components/core/HomePage/Language';
import InstructorSection from '../Components/core/HomePage/InstructorSection';
import Footer from '../Components/Common/Footer';

import './Home.css';

const Home = () => {
  return (
    <div className="home-page-shell">
      <HeroSection />
      <PlatformSection />
      <LearningPathSection />
      <Timeline />
      <Language />
      <InstructorSection />
      <Footer />
    </div>
  );
};

export default Home;
