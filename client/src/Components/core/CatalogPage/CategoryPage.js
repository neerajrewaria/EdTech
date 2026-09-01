import React from 'react';
import { apiConnector } from '../../../services/apiconnector';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CourseCard from './CourseCard';
import Footer from '../../Common/Footer';
import { categories } from '../../../services/apis';
import { motion } from 'framer-motion';
import { FiGrid, FiStar, FiClock, FiChevronRight, FiFilter } from 'react-icons/fi';
import HighlightText from '../HomePage/HighlightText';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryCourses = async () => {
      setLoading(true);
      try {
        const response = await apiConnector(
          "GET",
          `${categories.GET_CATEGORY_PAGE_DETAILS_API}/${categoryId}`
        );

        if (!response?.data?.success) {
          throw new Error("Could not fetch category details");
        }

        setCategoryData(response.data.data);
      }
      catch (error) {
        toast.error(error.message || "Something went wrong");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryCourses();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="modern-loading-screen">
        <div className="modern-spinner"></div>
        <p>Curating the best paths in {categoryData?.name || "Tech"}...</p>
      </div>
    );
  }

  const courseCount = categoryData?.course?.length || 0;

  // Stagger variants for the course grid
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <div className="modern-category-layout">

        {/* Modern SaaS / Coursera-inspired Hero Header */}
        <header className="modern-hero-header">
          <motion.div 
            className="modern-hero-inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="modern-breadcrumb">
              Home <FiChevronRight className="breadcrumb-separator" /> Catalog <FiChevronRight className="breadcrumb-separator" /> <span className="breadcrumb-current">{categoryData?.name}</span>
            </nav>

            <h1 className="modern-category-heading">
              {categoryData?.name?.split(" ").length > 1 
                ? <>
                    {categoryData?.name?.split(" ").slice(0, -1).join(" ")}
                    <HighlightText text={categoryData?.name?.split(" ").slice(-1)[0]} />
                  </>
                : categoryData?.name
              }
            </h1>
            <p className="modern-category-description">{categoryData?.description || "Master highly-sought-after practical methodologies, learn with industry experts, and advance your technical career path step-by-step."}</p>

            {/* Contextual Platform Badges & Metrics */}
            <div className="modern-hero-stats">
              <div className="stat-pill">
                <FiGrid className="stat-icon" />
                <strong>{courseCount}</strong> Programs Available
              </div>
              <div className="stat-pill">
                <FiStar className="stat-icon highlight" /> Top Rated Tracks
              </div>
              <div className="stat-pill">
                <FiClock className="stat-icon" /> Self-Paced Learning
              </div>
            </div>
          </motion.div>
        </header>

        {/* Content Section utilizing a dual-column layout */}
        <main className="modern-category-container">
          <div className="category-layout-grid">

            {/* Functional Left Sidebar Panel */}
            <aside className="modern-filter-sidebar">
              <div className="sidebar-widget">
                <h3 className="widget-title"><FiFilter /> Explore Catalog</h3>
                <ul className="sidebar-links">
                  <li className="active-link">All {categoryData?.name} Courses</li>
                  <li>New Releases</li>
                  <li>Professional Certificates</li>
                  <li>Learning Paths</li>
                </ul>
              </div>

              <div className="sidebar-widget advertisement-card">
                <h4>Advance Your Career</h4>
                <p>Get unlimited access to all expert-led technical certificates and tracks with an NCodex Plus membership.</p>
                <button className="sidebar-promo-btn" type="button" disabled>Learn More</button>
              </div>
            </aside>

            {/* Main Dynamic Grid Content */}
            <section className="modern-courses-content">
              <div className="content-header-strip">
                <div className="results-counter">
                  Showing <span>{courseCount}</span> comprehensive modules
                </div>
                <div className="modern-pills-row">
                    <button className="modern-pill-btn active">Most Popular</button>
                    <button className="modern-pill-btn">Newest</button>
                    <button className="modern-pill-btn">Beginner</button>
                </div>
              </div>

              {courseCount > 0 ? (
                <motion.div 
                  className="modern-course-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {categoryData.course.map((course, index) => (
                    <CourseCard key={course._id} course={course} index={index} />
                  ))}
                </motion.div>
              ) : (
                <div className="modern-empty-box">
                  <div className="empty-state-graphic">📂</div>
                  <h3 className="modern-section-title">No programs active right now</h3>
                  <p className="modern-section-subtitle">We are currently updating our syllabus for {categoryData?.name}. Check back shortly for brand new, industry-aligned releases.</p>
                </div>
              )}
            </section>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;