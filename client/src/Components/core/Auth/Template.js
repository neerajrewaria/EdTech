import { useSelector } from "react-redux"

import LoginForm from "../../../pages/LoginForm.js"
import SignupForm from "../../../pages/SignupForm.js"

import "./Template.css"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="template-container">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner" />
        </div>
      ) : (
        <div className="template-content">
          {/* Left: form panel */}
          <div className="template-form-section">
            <div className="template-form-inner">
              <span className="template-badge">
                {formType === "signup" ? "Create account" : "Welcome back"}
              </span>

              <h1 className="template-title">{title}</h1>

              <p className="template-description">
                <span className="description-one">{description1}</span>{" "}
                <span className="description-two">{description2}</span>
              </p>

              {formType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
          </div>

          {/* Right: brand / image panel */}
          <div className="template-image-section">
            <div className="image-glow" aria-hidden="true" />
            <div className="image-frame">
              <img src={image || "/placeholder.svg"} alt="Students learning together" className="student-image" />
            </div>

            <div className="image-caption">
              <p className="image-caption-title">Learn without limits</p>
              <p className="image-caption-text">
                Join thousands of learners building real skills, one lesson at a time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
