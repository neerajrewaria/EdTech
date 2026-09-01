import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiStar, FiUser } from 'react-icons/fi';
import './CourseCard.css';

const CourseCard = ({ course, index = 0 }) => { 
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="saas-grid-card"
            onClick={() => {
                if (course?._id) navigate(`/courses/${course._id}`);
            }}
        >
            {/* Visual Top Panel */}
            <div className="saas-card-banner">
                <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="saas-card-img"
                    loading="lazy"
                />
                <div className="saas-card-overlay"></div>
                <div className="saas-card-badge-floating">Bestseller</div>
            </div>

            {/* Structured Details Body */}
            <div className="saas-card-body">
                <div className="saas-card-header">
                    <span className="saas-card-tag">Professional Track</span>
                </div>

                <h3 className="saas-card-title">
                    {course?.courseName}
                </h3>

                <p className="saas-card-instructor">
                    <FiUser style={{ marginRight: '6px', opacity: 0.7 }} />
                    {course?.instructor?.firstname} {course?.instructor?.lastname}
                </p>

                {/* Social Proof Star Grid Section */}
                <div className="saas-card-meta-row">
                    <span className="rating-score">4.5</span>
                    <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FiStar key={star} fill="currentColor" size={14} />
                        ))}
                    </div>
                    <span>({course?.ratingAndReviews?.length || 0} reviews)</span>
                </div>

                {/* Bottom Action Footer Panel */}
                <div className="saas-card-footer">
                    <div className="saas-price-value-row">
                        <span className="saas-price-currency">Rs.</span>
                        <span className="saas-card-price">{course?.price}</span>
                    </div>
                    
                    <div className="saas-card-cta-circle" aria-label="View course details">
                        <FiArrowUpRight size={18} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;