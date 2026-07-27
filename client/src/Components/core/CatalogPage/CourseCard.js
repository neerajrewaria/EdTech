import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CourseCard.css'

const CourseCard = ({ course }) => { 
    const navigate = useNavigate()

    return (
        <div
            className="saas-grid-card"
            onClick={() => {
                if (course?._id) navigate(`/courses/${course._id}`)
            }}
        >
            {/* Visual Top Panel */}
            <div className="saas-card-banner">
                <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="saas-card-img"
                />
                <div className="saas-card-badge-floating">Bestseller</div>
            </div>

            {/* Structured Details Body */}
            <div className="saas-card-details-pane">
                <div className="saas-card-meta-top">
                    <span className="saas-badge-tag">Professional Track</span>
                    <p className="saas-card-author">
                        {course?.instructor?.firstname} {course?.instructor?.lastname}
                    </p>
                </div>

                <h3 className="saas-card-main-title">
                    {course?.courseName}
                </h3>

                {/* Social Proof Star Grid Section */}
                <div className="saas-card-rating-group">
                    <div className="saas-rating-box-pill">
                        <span>4.5</span>
                        <span className="saas-star-mini">★</span>
                    </div>
                    <span className="saas-stars-literal" aria-hidden="true">★★★★★</span>
                    <span className="saas-rating-accumulator">
                        ({course?.ratingAndReviews?.length || 0})
                    </span>
                </div>

                {/* Bottom Action Footer Panel */}
                <div className="saas-card-pricing-footer">
                    <div className="saas-card-price-block">
                        <span className="saas-price-caption">Total Investment</span>
                        <div className="saas-price-value-row">
                            <span className="saas-currency">Rs.</span>
                            <span className="saas-amount">{course?.price}</span>
                        </div>
                    </div>
                    
                    <div className="saas-card-cta-circle" aria-label="View course details">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;