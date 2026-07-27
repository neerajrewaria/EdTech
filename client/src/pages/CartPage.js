import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../slices/cartSlice';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
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
                        <h1 className="saas-checkout-main-title">Shopping Cart</h1>
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
                                    <div key={course._id} className="saas-item-row-strip">
                                        
                                        {/* Aspect locked image box */}
                                        <div className="saas-item-media-box">
                                            <img src={course?.thumbnail} alt={course?.courseName} className="saas-item-img" />
                                        </div>

                                        {/* Center text breakdown block */}
                                        <div className="saas-item-description-block">
                                            <div className="saas-item-meta-top">
                                                <span className="saas-item-category-tag">{course?.category?.name || "Professional Track"}</span>
                                            </div>
                                            <h3 className="saas-item-title">{course?.courseName}</h3>
                                            <p className="saas-item-author">
                                                By <span className="author-highlight">{course?.instructor?.firstname} {course?.instructor?.lastname}</span>
                                            </p>
                                        </div>

                                        {/* Right actions and calculation metrics panels */}
                                        <div className="saas-item-pricing-actions-block">
                                            <div className="saas-item-price-label">
                                                <span className="currency">Rs.</span>
                                                <span className="amount">{course?.price}</span>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFromCart(course?._id)}
                                                className="saas-item-delete-action"
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
                                <div className="saas-summary-sticky-card">
                                    <h2 className="saas-summary-card-heading">Order Summary</h2>
                                    
                                    <div className="saas-summary-billing-ledger">
                                        <div className="ledger-row">
                                            <span className="ledger-label">Subtotal ({totalItems} {totalItems === 1 ? 'Course' : 'Courses'})</span>
                                            <span className="ledger-value">Rs. {total}</span>
                                        </div>
                                        <div className="ledger-row">
                                            <span className="ledger-label">Platform Fee</span>
                                            <span className="ledger-value value-free">FREE</span>
                                        </div>
                                        
                                        <hr className="ledger-divider" />
                                        
                                        <div className="ledger-row total-row">
                                            <span className="ledger-label-total">Total Investment</span>
                                            <div className="ledger-total-price-box">
                                                <span className="total-currency">Rs.</span>
                                                <span className="total-amount">{total}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action execution call */}
                                    <button 
                                        onClick={handleBuyNow} 
                                        className="saas-summary-checkout-cta-btn"
                                        type="button"
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <div className="saas-summary-trust-footer">
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