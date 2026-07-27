import "./LoginForm.css"

import { useState } from "react"
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
} from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../services/operations/authAPI"

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
        {/* Email */}
        <label className="form-field">
          <span className="form-field__label">
            Email Address <sup className="required">*</sup>
          </span>

          <div className="form-field__control">
            <AiOutlineMail className="form-field__icon" fontSize={20} />
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="form-field__input"
            />
          </div>
        </label>

        {/* Password */}
        <label className="form-field">
          <span className="form-field__label">
            Password <sup className="required">*</sup>
          </span>

          <div className="form-field__control">
            <AiOutlineLock className="form-field__icon" fontSize={20} />
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
                <AiOutlineEyeInvisible fontSize={22} />
              ) : (
                <AiOutlineEye fontSize={22} />
              )}
            </button>
          </div>

          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>
        </label>

        <button type="submit" className="submit-btn">
          Sign In
        </button>
      </form>
  )
}

export default LoginForm
