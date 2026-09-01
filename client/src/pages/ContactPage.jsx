import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaLaptopCode, FaChalkboardUser } from 'react-icons/fa6';
import { FiMail, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Footer from '../Components/Common/Footer';
import './ContactPage.css';

const obysEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.85, ease: obysEase },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: obysEase },
  },
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "General Support",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error("Please fill in all mandatory communication fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Submitting secure contact payload: ", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData({ fullName: "", email: "", subject: "General Support", message: "" });
    } catch (error) {
      toast.error("An error occurred while sending your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page-root">
      
      {/* HERO SECTION */}
      <section className="contact-hero-section">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUpVariants}>
            <span className="about-pill-tag">
              <FiZap /> Contact & Support Desk
            </span>
          </motion.div>

          <div style={{ marginBottom: '16px' }}>
            <div className="nx-line-mask">
              <motion.h1 className="contact-hero-title" variants={lineVariants}>
                Let's Start A
              </motion.h1>
            </div>
            <div className="nx-line-mask">
              <motion.h1 className="contact-hero-title nx-gradient-brand" variants={lineVariants}>
                Conversation.
              </motion.h1>
            </div>
          </div>

          <motion.div variants={fadeUpVariants}>
            <p className="contact-hero-sub">
              Have a question about NCodeX, course tracks, account enrollment, or instructor course publishing? Send us a message and we will respond promptly.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* MAIN WORKSPACE SECTION */}
      <section className="contact-workspace-section">
        <div className="contact-grid-container">
          
          {/* LEFT COLUMN: EDITORIAL CHANNELS */}
          <motion.div 
            className="contact-info-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: obysEase }}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                DIRECT ASSISTANCE
              </span>
              <h2 className="nx-section-heading" style={{ margin: '8px 0 16px' }}>
                How Can We <span className="nx-gradient-brand">Help You?</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                Whether you're a learner exploring courses or an educator building curriculum, select a topic or send a direct message via the form.
              </p>
            </div>

            <div className="contact-channel-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56,189,248,0.12)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <FaLaptopCode />
                </div>
                <div>
                  <strong style={{ fontSize: '1rem', display: 'block' }}>Student Support</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Enrollment, Cart & Video Streaming</span>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                Get help with course discovery, cart checkout issues, video lecture playback, or dashboard access.
              </p>
            </div>

            <div className="contact-channel-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99,102,241,0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <FaChalkboardUser />
                </div>
                <div>
                  <strong style={{ fontSize: '1rem', display: 'block' }}>Instructor Inquiries</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Course Creation & Publishing Studio</span>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                Inquire about instructor registration, section building, lecture video uploads, and publishing tools.
              </p>
            </div>

            <div style={{ padding: '20px 24px', borderRadius: '16px', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FiMail style={{ color: 'var(--accent)', fontSize: '1.3rem' }} />
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>DIRECT EMAIL INBOX</span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>support@ncodex.edu</strong>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: PREMIUM CONTACT FORM */}
          <motion.div 
            className="contact-form-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: obysEase }}
          >
            <div style={{ marginBottom: '28px', paddingBottom: '18px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '700', margin: '0 0 6px' }}>
                Send A Message
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                Fill out the form below and our team will get back to you promptly.
              </p>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="contact-form-group">
                <label htmlFor="fullName" className="contact-form-label">
                  Full Name <span style={{ color: 'var(--primary)' }}>*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Alexander Wright"
                  className="contact-form-input"
                  required
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="email" className="contact-form-label">
                  Email Address <span style={{ color: 'var(--primary)' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. alexander@example.com"
                  className="contact-form-input"
                  required
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="subject" className="contact-form-label">
                  Topic / Division
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="contact-form-select"
                >
                  <option value="General Support">General Support & Guidance</option>
                  <option value="Learner Access">Course Access & Cart Help</option>
                  <option value="Instructor Registration">Instructor Applications</option>
                  <option value="Feedback">Platform Feedback</option>
                </select>
              </div>

              <div className="contact-form-group">
                <label htmlFor="message" className="contact-form-label">
                  Message Details <span style={{ color: 'var(--primary)' }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your inquiry or question in detail..."
                  className="contact-form-textarea"
                  rows="5"
                  required
                />
              </div>

              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{ marginTop: '28px' }}
              >
                <button 
                  type="submit" 
                  className="nx-btn nx-btn-primary" 
                  style={{ width: '100%', cursor: 'pointer' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
