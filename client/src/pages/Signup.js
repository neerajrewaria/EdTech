import img2 from "../assests/Images/signin.jpg";
import Template from "../Components/core/Auth/Template.js";

function Signup() {
  return (
    <Template
      title="Join the millions learning to code with EdTech for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={img2}
      formType="signup"
    />
  )
}

export default Signup