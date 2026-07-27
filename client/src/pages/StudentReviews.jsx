import React from 'react';
import { RiStarFill, RiVerifiedBadgeFill, RiDoubleQuotesL } from 'react-icons/ri';
import './StudentReviews.css';

const StudentReviews = () => {
  // Production-level data array ready to hook into an API later
  const mockReviews = [
    {
      _id: "rev_1",
      studentName: "Arjun Mehta",
      role: "Full Stack Engineer at Razorpay",
      initials: "AM",
      avatarGradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
      achievementTag: "Placed",
      reviewText: "The sandbox tracks on NCodex are unmatched. Building real-world microservices with rigorous code quality validation entirely changed how I write backend architecture.",
      rating: 5
    },
    {
      _id: "rev_2",
      studentName: "Sarah Jenkins",
      role: "Data Analyst Trainee",
      initials: "SJ",
      avatarGradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
      achievementTag: "10x Certified",
      reviewText: "I went from basic python script scripting to deploying complex predictive pipelines. The learning paths don't let you get stuck; everything is structured perfectly.",
      rating: 5
    },
    {
      _id: "rev_3",
      studentName: "Rohan Sharma",
      role: "Systems Security Engineer",
      initials: "RS",
      avatarGradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
      achievementTag: "Contributed OpenSource",
      reviewText: "The peer review community here acts like a real production tech company. Getting my git commits vetted by core maintainers gave me immense deployment confidence.",
      rating: 5
    }
  ];

  return (
    <section className="student-reviews-feed-root-section">
      <div className="student-reviews-feed-container">
        
        {/* Section Heading Hook */}
        <header className="student-reviews-feed-section-header">
          <span className="student-reviews-feed-pill-badge">Validated Results</span>
          <h2 className="student-reviews-feed-section-title">
            Proven engineering milestones from active developers
          </h2>
          <p className="student-reviews-feed-section-subtitle">
            See how members leverage NCodex workflows to clear production technical assessments, contribute code, and secure remote roles.
          </p>
        </header>

        {/* Dynamic Reviews Flex Grid */}
        <div className="student-reviews-feed-cards-grid">
          {mockReviews.map((review) => (
            <div key={review._id} className="student-reviews-feed-card-item">
              
              {/* Decorative Quotation Vector Background */}
              <div className="student-reviews-feed-quote-watermark">
                <RiDoubleQuotesL />
              </div>

              {/* Card Meta Row */}
              <div className="student-reviews-feed-card-top-strip">
                <div className="student-reviews-feed-stars-row">
                  {[...Array(review.rating)].map((_, index) => (
                    <RiStarFill key={index} className="star-icon-glyph" />
                  ))}
                </div>
                <span className="student-reviews-feed-achievement-tag">
                  {review.achievementTag}
                </span>
              </div>

              {/* Core Review Payload Text */}
              <p className="student-reviews-feed-body-payload">
                "{review.reviewText}"
              </p>

              {/* Author Attribution Profile Section */}
              <div className="student-reviews-feed-author-profile">
                <div 
                  className="student-reviews-feed-avatar-node"
                  style={{ background: review.avatarGradient }}
                >
                  <span>{review.initials}</span>
                </div>
                <div className="student-reviews-feed-author-meta-text">
                  <h4 className="student-reviews-feed-author-name">
                    {review.studentName}
                    <RiVerifiedBadgeFill className="verified-badge-icon" title="Verified Alumni Profile" />
                  </h4>
                  <p className="student-reviews-feed-author-role">{review.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StudentReviews;