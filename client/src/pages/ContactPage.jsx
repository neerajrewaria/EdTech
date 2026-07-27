"use client"

import React, { useState } from "react"
import {
  RiMailSendLine,
  RiQuestionLine,
  RiBuilding4Line,
  RiArrowRightUpLine,
  RiShieldCheckLine,
  RiTimeLine,
  RiSparkling2Line,
} from "react-icons/ri"
import toast from "react-hot-toast"
import "./ContactPage.css"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "General Support",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error("Please fill in all mandatory communication parameters.")
      return
    }

    setIsSubmitting(true)
    try {
      console.log("Submitting secure contact payload: ", formData)
      await new Promise((resolve) => setTimeout(resolve, 1200))

      toast.success("Message dispatched! Our support matrix will contact you shortly.")
      setFormData({ fullName: "", email: "", subject: "General Support", message: "" })
    } catch (error) {
      toast.error("An error occurred while sending your request. Try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resources = [
    {
      icon: <RiQuestionLine />,
      accent: "cyan",
      title: "Knowledge Base & Help Center",
      desc: "Review comprehensive diagnostic documentation, learning path setups, and student enrollment FAQs.",
      link: "Explore Docs",
    },
    {
      icon: <RiMailSendLine />,
      accent: "blue",
      title: "Direct Communications",
      desc: "Reach our unified monitoring deck at support@ncodex.edu for rapid priority escalation requests.",
      link: "support@ncodex.edu",
    },
    {
      icon: <RiBuilding4Line />,
      accent: "violet",
      title: "Corporate Headquarters",
      desc: "NCodex HQ Hub, Phase II Silicon Workspace Complex, Level 7 Tech Parks, IN.",
      link: "View on map",
    },
  ]

  return (
    <div className="ncx-contact-root">
      {/* Ambient background glows */}
      <div className="ncx-glow ncx-glow-a" aria-hidden="true" />
      <div className="ncx-glow ncx-glow-b" aria-hidden="true" />

      <div className="ncx-shell">
        {/* HERO HEADER */}
        <header className="ncx-hero">
          <span className="ncx-eyebrow">
            <RiSparkling2Line />
            Connect With NCodex
          </span>
          <h1 className="ncx-hero-title">Let&apos;s engineer something incredible together</h1>
          <p className="ncx-hero-sub">
            Questions about an advanced learning path, enterprise licensing, or academic curriculum support? Pick a
            channel below or send us a secure message.
          </p>
        </header>

        {/* RESOURCE CARD ROW */}
        <section className="ncx-resource-grid" aria-label="Contact channels">
          {resources.map((r) => (
            <article key={r.title} className={`ncx-resource-card accent-${r.accent}`}>
              <div className="ncx-resource-top">
                <div className={`ncx-icon-chip accent-${r.accent}`}>{r.icon}</div>
                <RiArrowRightUpLine className="ncx-resource-arrow" />
              </div>
              <h3 className="ncx-resource-title">{r.title}</h3>
              <p className="ncx-resource-desc">{r.desc}</p>
              <span className="ncx-resource-link">{r.link}</span>
            </article>
          ))}
        </section>

        {/* MAIN WORKSPACE: form + side panel */}
        <section className="ncx-workspace">
          {/* FORM CARD */}
          <div className="ncx-form-card">
            <div className="ncx-form-head">
              <div>
                <h2 className="ncx-form-title">Dispatch Secure Message</h2>
                <p className="ncx-form-subtitle">Average response cycle window: &lt; 4 business hours</p>
              </div>
              <span className="ncx-online-tag">
                <span className="ncx-dot" /> Online
              </span>
            </div>

            <form className="ncx-form" onSubmit={handleFormSubmit}>
              <div className="ncx-field-row">
                <div className="ncx-field">
                  <label htmlFor="fullName" className="ncx-label">
                    Full Name <span className="ncx-req">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g., Alexander Wright"
                    className="ncx-input"
                    required
                  />
                </div>

                <div className="ncx-field">
                  <label htmlFor="email" className="ncx-label">
                    Workspace Email <span className="ncx-req">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g., alexander@company.com"
                    className="ncx-input"
                    required
                  />
                </div>
              </div>

              <div className="ncx-field">
                <label htmlFor="subject" className="ncx-label">
                  Context Division / Topic
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="ncx-input ncx-select"
                >
                  <option value="General Support">General Support &amp; Guidance</option>
                  <option value="Enterprise Billing">Enterprise Custom Licenses</option>
                  <option value="Instructor Registration">Instructor Applications</option>
                  <option value="Security Escalation">Bug Reporting &amp; Security</option>
                </select>
              </div>

              <div className="ncx-field">
                <label htmlFor="message" className="ncx-label">
                  Message Payload <span className="ncx-req">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your request in detail..."
                  className="ncx-input ncx-textarea"
                  rows="5"
                  required
                />
              </div>

              <button type="submit" className="ncx-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="ncx-spinner" aria-label="Sending" />
                ) : (
                  <>
                    <RiMailSendLine />
                    <span>Transmit Query</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* SIDE ASSURANCE PANEL */}
          <aside className="ncx-side-panel">
            <div className="ncx-side-feature">
              <div className="ncx-side-icon">
                <RiTimeLine />
              </div>
              <div>
                <h4>Rapid Response</h4>
                <p>Most messages are answered in under 4 hours by a real engineer.</p>
              </div>
            </div>
            <div className="ncx-side-feature">
              <div className="ncx-side-icon">
                <RiShieldCheckLine />
              </div>
              <div>
                <h4>Encrypted Transit</h4>
                <p>Your payload is dispatched over a secured, end-to-end channel.</p>
              </div>
            </div>

            <div className="ncx-side-stats">
              <div className="ncx-stat">
                <strong>98%</strong>
                <span>Satisfaction</span>
              </div>
              <div className="ncx-stat">
                <strong>4h</strong>
                <span>Avg. Reply</span>
              </div>
              <div className="ncx-stat">
                <strong>24/7</strong>
                <span>Coverage</span>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}

export default ContactPage
