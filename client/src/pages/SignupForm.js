import React, { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai"
import { FaArrowRight, FaLaptopCode, FaChalkboardUser } from "react-icons/fa6"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOTP } from "../services/operations/authAPI"
import { setSignupData } from "../slices/authSlice"
import { ACCOUNT_TYPE } from "../utils/constants"
import "../App.css"

const formStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
}

const itemFade = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

function SignupForm({ activeRole: parentRole, setActiveRole: setParentRole }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Internal state fallback or synced parent state
  const [internalRole, setInternalRole] = useState(ACCOUNT_TYPE.STUDENT)

  const accountType = parentRole || internalRole

  const handleRoleChange = (role) => {
    setInternalRole(role)
    if (setParentRole) {
      setParentRole(role)
    }
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confpassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confpassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confpassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    dispatch(setSignupData(signupData))
    dispatch(sendOTP(email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confpassword: "",
    })
    handleRoleChange(ACCOUNT_TYPE.STUDENT)
  }

  return (
    <div className="signup-wrapper">
      <motion.div
        variants={formStagger}
        initial="hidden"
        animate="visible"
      >
        {/* Elevated Persona Identity Cards */}
        <motion.div 
          variants={itemFade}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}
        >
          <button
            type="button"
            onClick={() => handleRoleChange(ACCOUNT_TYPE.STUDENT)}
            className={`role-select-card ${accountType === ACCOUNT_TYPE.STUDENT ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <FaLaptopCode style={{ fontSize: '0.9rem' }} />
              <span style={{ fontWeight: '700', fontSize: '0.78rem' }}>Student</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.68rem', opacity: 0.75, lineHeight: '1.2' }}>
              Learn, enroll & build skills
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange(ACCOUNT_TYPE.INSTRUCTOR)}
            className={`role-select-card ${accountType === ACCOUNT_TYPE.INSTRUCTOR ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <FaChalkboardUser style={{ fontSize: '0.9rem' }} />
              <span style={{ fontWeight: '700', fontSize: '0.78rem' }}>Instructor</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.68rem', opacity: 0.75, lineHeight: '1.2' }}>
              Create & publish courses
            </p>
          </button>
        </motion.div>

        <form onSubmit={handleOnSubmit} className="signup-form">
          <motion.div className="signup-row" variants={itemFade}>
            <div className="signup-label">
              <span className="signup-label-text">
                First Name <span className="signup-required">*</span>
              </span>
              <div className="signup-field">
                <AiOutlineUser className="signup-field-icon" />
                <input
                  required
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleOnChange}
                  placeholder="First name"
                  className="signup-input"
                />
              </div>
            </div>

            <div className="signup-label">
              <span className="signup-label-text">
                Last Name <span className="signup-required">*</span>
              </span>
              <div className="signup-field">
                <AiOutlineUser className="signup-field-icon" />
                <input
                  required
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleOnChange}
                  placeholder="Last name"
                  className="signup-input"
                />
              </div>
            </div>
          </motion.div>

          <motion.div className="signup-label" variants={itemFade}>
            <span className="signup-label-text">
              Workspace Email <span className="signup-required">*</span>
            </span>
            <div className="signup-field">
              <AiOutlineMail className="signup-field-icon" />
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="alexander@company.com"
                className="signup-input"
              />
            </div>
          </motion.div>

          <motion.div className="signup-row" variants={itemFade}>
            <div className="signup-label">
              <span className="signup-label-text">
                Create Password <span className="signup-required">*</span>
              </span>
              <div className="signup-field">
                <AiOutlineLock className="signup-field-icon" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Password"
                  className="signup-input signup-input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="signup-eye-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={18} />
                  ) : (
                    <AiOutlineEye fontSize={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="signup-label">
              <span className="signup-label-text">
                Confirm Password <span className="signup-required">*</span>
              </span>
              <div className="signup-field">
                <AiOutlineLock className="signup-field-icon" />
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confpassword"
                  value={confpassword}
                  onChange={handleOnChange}
                  placeholder="Confirm"
                  className="signup-input signup-input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="signup-eye-btn"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={18} />
                  ) : (
                    <AiOutlineEye fontSize={18} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemFade}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            style={{ marginTop: '14px' }}
          >
            <button type="submit" className="signup-submit-btn">
              <span>Create Account & Verify OTP</span>
              <FaArrowRight fontSize={13} />
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

export default SignupForm
