import React from 'react';
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AddToCart } from '../services/operations/Cart';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { motion } from 'framer-motion';
import './CourseBuyCard.css';

function CourseBuyCard({ courseData }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    
    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
    } = courseData;

    const handleShare = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(window.location.href);
        toast.success("Course URL copied to clipboard!");
    }

    const handleToAddCart = (e) => {
        e.stopPropagation();
        AddToCart(courseData, token, navigate, dispatch);
    }

    const handleBuyCourse = (e) => {
        e.stopPropagation();
        if (token) {
            buyCourse(token, [courseData._id], user, navigate, dispatch);
            return;
        }
        toast.error("Please log in to buy courses.");
        navigate("/login");
    };

    return (
        <motion.aside 
            className="premium-checkout-panel"
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
            style={{ perspective: 1000 }}
        >
            {/* Visual Header Wrapper */}
            <div className="premium-checkout-media">
                <img
                    src={ThumbnailImage}
                    alt="Course Preview Artwork"
                    className="premium-checkout-img"
                />
                <div className="premium-checkout-overlay-play">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                    </svg>
                </div>
            </div>

            {/* Core Action & Pricing Content Area */}
            <div className="premium-checkout-body">
                <div className="premium-price-container">
                    <span className="premium-price-lbl">Total Enrollment Fee</span>
                    <div className="premium-price-val-row">
                        <span className="premium-price-currency">Rs.</span>
                        <span className="premium-price-main">{CurrentPrice}</span>
                    </div>
                </div>

                {/* Primary Interaction Buttons Tier */}
                <div className="premium-action-buttons-group">
                    <button 
                        onClick={handleBuyCourse} 
                        className="premium-btn-primary glow-effect"
                        type="button"
                    >
                        <span>Buy Now</span>
                    </button>
                    <button 
                        className="premium-btn-secondary" 
                        onClick={handleToAddCart}
                        type="button"
                    >
                        Add to Cart
                    </button>
                </div>

                <p className="premium-text-guarantee">
                    <span role="img" aria-label="shield">🛡️</span> Secure Checkout • 30-Day Money-Back Guarantee
                </p>

                <hr className="premium-checkout-divider" />

                {/* Value-Add Course Inclusions Panel */}
                <div className="premium-inclusions-wrapper">
                    <h4 className="premium-inclusions-heading">This premium course includes:</h4>
                    <div className="premium-inclusion-badge">
                        <BsFillCaretRightFill className="premium-inclusion-icon" />
                        <span>Full Lifetime Access</span>
                    </div>
                    <div className="premium-inclusion-badge">
                        <BsFillCaretRightFill className="premium-inclusion-icon" />
                        <span>Access on Mobile and TV</span>
                    </div>
                    <div className="premium-inclusion-badge">
                        <BsFillCaretRightFill className="premium-inclusion-icon" />
                        <span>Certificate of Completion</span>
                    </div>
                </div>

                {/* Utility Controls Tier */}
                <div className="premium-checkout-footer-meta">
                    <button 
                        className="premium-share-action-link" 
                        onClick={handleShare}
                    >
                        <FaShareSquare /> 
                        <span>Share Course</span>
                    </button>
                </div>
            </div>
        </motion.aside>
    )
}

export default CourseBuyCard;