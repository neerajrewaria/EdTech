

import { useState } from "react"
import { toast } from "react-hot-toast"
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOTP } from "../services/operations/authAPI"
import { setSignupData } from "../slices/authSlice"
import { ACCOUNT_TYPE } from "../utils/constants"
import Tab from "../Components/Common/Tab"
import '../App.css';

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

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

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
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

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOTP(email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div className="signup-wrapper">
      <div className="signup-tab">
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      </div>

      <form onSubmit={handleOnSubmit} className="signup-form">
        <div className="signup-row">
          <label className="signup-label">
            <span className="signup-label-text">
              First Name <sup className="signup-required">*</sup>
            </span>
            <div className="signup-field">
              <AiOutlineUser className="signup-field-icon" />
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                className="signup-input"
              />
            </div>
          </label>

          <label className="signup-label">
            <span className="signup-label-text">
              Last Name <sup className="signup-required">*</sup>
            </span>
            <div className="signup-field">
              <AiOutlineUser className="signup-field-icon" />
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                className="signup-input"
              />
            </div>
          </label>
        </div>

        <label className="signup-label">
          <span className="signup-label-text">
            Email Address <sup className="signup-required">*</sup>
          </span>
          <div className="signup-field">
            <AiOutlineMail className="signup-field-icon" />
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="signup-input"
            />
          </div>
        </label>

        <div className="signup-row">
          <label className="signup-label">
            <span className="signup-label-text">
              Create Password <sup className="signup-required">*</sup>
            </span>
            <div className="signup-field">
              <AiOutlineLock className="signup-field-icon" />
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="signup-input signup-input-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="signup-eye-btn"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} />
                ) : (
                  <AiOutlineEye fontSize={22} />
                )}
              </button>
            </div>
          </label>

          <label className="signup-label">
            <span className="signup-label-text">
              Confirm Password <sup className="signup-required">*</sup>
            </span>
            <div className="signup-field">
              <AiOutlineLock className="signup-field-icon" />
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confpassword"
                value={confpassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
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
                  <AiOutlineEyeInvisible fontSize={22} />
                ) : (
                  <AiOutlineEye fontSize={22} />
                )}
              </button>
            </div>
          </label>
        </div>

        <button type="submit" className="signup-submit-btn">
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
