import img1 from "../assests/Images/login.jpg";
import Template from "../Components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education  to future-proof your career."
      image={img1}
      formType="login"
    />
  )
}

export default Login