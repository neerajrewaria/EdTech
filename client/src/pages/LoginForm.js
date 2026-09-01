import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
} from "react-icons/ai"
import { FaArrowRight } from "react-icons/fa6"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../services/operations/authAPI"
import "./LoginForm.css"

const formStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form onSubmit={handleOnSubmit} className="login-form">
      <motion.div
        variants={formStagger}
        initial="hidden"
        animate="visible"
      >
        {/* Email */}
        <motion.div className="form-field" variants={itemFade}>
          <label className="form-field__label">
            <span>
              Workspace Email <span className="required">*</span>
            </span>
          </label>

          <div className="form-field__control">
            <AiOutlineMail className="form-field__icon" />
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="e.g. alexander@company.com"
              className="form-field__input"
            />
          </div>
        </motion.div>

        {/* Password */}
        <motion.div className="form-field" variants={itemFade}>
          <label className="form-field__label">
            <span>
              Password <span className="required">*</span>
            </span>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </label>

          <div className="form-field__control">
            <AiOutlineLock className="form-field__icon" />
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-field__input has-trailing"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="form-field__toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={18} />
              ) : (
                <AiOutlineEye fontSize={18} />
              )}
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={itemFade}
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.99 }}
          style={{ marginTop: '16px' }}
        >
          <button type="submit" className="submit-btn">
            <span>Sign In To Workspace</span>
            <FaArrowRight fontSize={13} />
          </button>
        </motion.div>
      </motion.div>
    </form>
  )
}

export default LoginForm
