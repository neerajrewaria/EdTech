import React from 'react';
import { apiConnector } from '../../../services/apiconnector';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CourseCard from './CourseCard';
import Footer from '../../Common/Footer';
import { categories } from '../../../services/apis';
import './CategoryPage.css'; // Make sure to import the CSS file below

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
        <p>Curating the best paths in {categoryData?.name || "Data Science"}...</p>
      </div>
    );
  }

  const courseCount = categoryData?.course?.length || 0;

  return (
    <>
      <div className="modern-category-layout">

        {/* Modern SaaS / Coursera-inspired Hero Header */}
        <header className="modern-hero-header">
          <div className="modern-hero-inner">
            <nav className="modern-breadcrumb">
              Home <span className="separator">/</span> Catalog <span className="separator">/</span> <span className="current">{categoryData?.name}</span>
            </nav>

            <h1 className="modern-main-title">{categoryData?.name}</h1>
            <p className="modern-subtitle">{categoryData?.description || "Master highly-sought-after practical methodologies, learn with industry experts, and advance your technical career path step-by-step."}</p>

            {/* Contextual Platform Badges & Metrics */}
            <div className="modern-hero-stats">
              <div className="stat-pill">
                <span className="stat-dot"></span>
                <strong>{courseCount}</strong> Programs Available
              </div>
              <div className="stat-pill">
                <span className="stat-icon">★</span> Top Rated Tracks
              </div>
              <div className="stat-pill">
                Self-Paced Learning
              </div>
            </div>
          </div>
        </header>

        {/* Content Section utilizing a dual-column layout */}
        <main className="modern-catalog-body">
          <div className="modern-catalog-container">

            {/* Functional Left Sidebar Panel */}
            <aside className="modern-filter-sidebar">
              <div className="sidebar-widget">
                <h3 className="widget-title">Explore Catalog</h3>
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
                <div className="dummy-sort-dropdown">
                  <label>Sort By:</label>
                  <select disabled style={{ cursor: 'not-allowed' }}>
                    <option>Most Popular</option>
                  </select>
                </div>
              </div>

              {courseCount > 0 ? (
                <div className="modern-course-grid">
                  {categoryData.course.map((course) => (
                    <div className="modern-grid-card-wrapper" key={course._id}>
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="modern-empty-state">
                  <div className="empty-state-graphic">📂</div>
                  <h3>No programs active right now</h3>
                  <p>We are currently updating our syllabus for {categoryData?.name}. Check back shortly for brand new, industry-aligned releases.</p>
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