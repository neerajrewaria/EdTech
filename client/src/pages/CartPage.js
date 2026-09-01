import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../slices/cartSlice';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import HighlightText from '../Components/core/HomePage/HighlightText';
import './CartPage.css'; // Importing your newly curated design sheet

const CartPage = () => {
    const { cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const totalItems = cart.length;
    const total = cart.reduce((acc, course) => acc + course.price, 0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveFromCart = (courseId) => {
        dispatch(removeFromCart(courseId));
    };

    const handleBuyNow = async () => {
        if (!token) {
            toast.error("Please log in to buy courses.");
            navigate("/login");
            return;
        }
        const coursesToEnroll = cart.map(course => course._id);
        if (coursesToEnroll.length > 0) {
            await buyCourse(token, coursesToEnroll, user, navigate, dispatch);
        } else {
            toast.error("Your cart is empty!");
        }
    };

    return (
        <>
            <div className="saas-checkout-workspace">
                {/* Clean Top Context Title Banner */}
                <header className="saas-checkout-header">
                    <div className="saas-checkout-header-inner">
                        <h1 className="saas-checkout-main-title">
                            Shopping <HighlightText text="Cart" />
                        </h1>
                        <p className="saas-checkout-counter-text">
                            You have <span className="highlight-pill">{totalItems}</span> {totalItems === 1 ? 'item' : 'items'} queued for review
                        </p>
                    </div>
                </header>

                {totalItems === 0 ? (
                    <div className="saas-empty-cart-container">
                        <div className="saas-empty-cart-icon">🛒</div>
                        <h2 className="saas-empty-cart-title">Your workspace cart is empty</h2>
                        <p className="saas-empty-cart-desc">Explore our top certifications and interactive labs to add premium skill tracks to your account.</p>
                        <Link to="/catalog" className="saas-empty-cart-btn">
                            Explore Catalog Tracks
                        </Link>
                    </div>
                ) : (
                    <main className="saas-checkout-body">
                        <div className="saas-checkout-grid">
                            
                            {/* LEFT AXIS: Curated List Rows */}
                            <section className="saas-checkout-items-stack">
                                {cart.map((course) => (
                                    <div key={course._id} className="saas-item-card">
                                        
                                        {/* Aspect locked image box */}
                                        <img src={course?.thumbnail} alt={course?.courseName} className="saas-item-thumb" />

                                        {/* Center text breakdown block */}
                                        <div className="saas-item-info">
                                            <div className="saas-item-meta-top">
                                                <span className="saas-item-category">{course?.category?.name || "Professional Track"}</span>
                                            </div>
                                            <h3 className="saas-item-title">{course?.courseName}</h3>
                                            <p className="saas-item-author" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                By <span className="author-highlight">{course?.instructor?.firstname} {course?.instructor?.lastname}</span>
                                            </p>
                                        </div>

                                        {/* Right actions and calculation metrics panels */}
                                        <div className="saas-item-actions">
                                            <div className="saas-item-price">
                                                Rs. {course?.price}
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFromCart(course?._id)}
                                                className="saas-remove-button"
                                                type="button"
                                                title="Remove item from order"
                                            >
                                                <FaTrash className="trash-icon" />
                                                <span>Remove</span>
                                            </button>
                                        </div>

                                    </div>
                                ))}
                            </section>

                            {/* RIGHT AXIS: Order Summary Billing Dashboard Panel */}
                            <aside className="saas-checkout-summary-pane">
                                <div className="saas-summary-box">
                                    <h2 className="saas-summary-title">
                                        Order <HighlightText text="Summary" />
                                    </h2>
                                    
                                    <div className="saas-summary-billing-ledger">
                                        <div className="saas-summary-row">
                                            <span className="ledger-label">Subtotal ({totalItems} {totalItems === 1 ? 'Course' : 'Courses'})</span>
                                            <span className="ledger-value">Rs. {total}</span>
                                        </div>
                                        <div className="saas-summary-row">
                                            <span className="ledger-label">Platform Fee</span>
                                            <span className="ledger-value value-free">FREE</span>
                                        </div>
                                        
                                        <hr style={{ border: 'none', borderTop: '1px solid var(--border-line)', margin: '16px 0' }} />
                                        
                                        <div className="saas-summary-total-row">
                                            <span className="saas-summary-total-label">Total Investment</span>
                                            <div className="saas-summary-total-price">
                                                Rs. {total}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action execution call */}
                                    <button 
                                        onClick={handleBuyNow} 
                                        className="saas-checkout-submit-btn glow-effect"
                                        type="button"
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <div className="saas-summary-trust-footer" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', justifyContent: 'center' }}>
                                        <span className="lock-icon">🔒</span>
                                        <span>Encrypted 256-bit Secure Gateway Connection</span>
                                    </div>
                                </div>
                            </aside>

                        </div>
                    </main>
                )}
            </div>
            
        </>
    );
};

export default CartPage;