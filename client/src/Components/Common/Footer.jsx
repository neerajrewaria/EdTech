import React from 'react'
import Logo from '../../assests/Images/Logo.png'

const Footer = () => {
  return (
    <div>
              {/*  footer*/}
              <footer className="footer">
        
                {/* TOP SECTION */}
                <div className="footer-top">
        
                  {/* COLUMN 1 */}
                  <div className="footer-column">
                    <div className='Logo-div' style={{ display: "flex", alignItems: 'center', gap: "10px" }}>
                      <img src={Logo} alt="" width={"35px"} height={"35px"} style={{ borderRadius: "9px" }} />
                      <h2 className="footer-logo">NCodeX</h2>
                    </div>
        
        
                    <div className="footer-section">
                      <h3>Company</h3>
                      <p>About</p>
                      <p>Careers</p>
                      <p>Affiliates</p>
                    </div>
        
                    <div className="footer-icons">
                      <span>F</span>
                      <span>G</span>
                      <span>T</span>
                      <span>Y</span>
                    </div>
                  </div>
        
                  {/* COLUMN 2 */}
                  <div className="footer-column">
                    <div className="footer-section">
                      <h3>Resources</h3>
                      <p>Articles</p>
                      <p>Blog</p>
                      <p>Chart Sheet</p>
                      <p>Code challenges</p>
                      <p>Docs</p>
                      <p>Projects</p>
                      <p>Videos</p>
                      <p>Workspaces</p>
                    </div>
        
                    <div className="footer-section">
                      <h3>Support</h3>
                      <p>Help Center</p>
                    </div>
                  </div>
        
                  {/* COLUMN 3 */}
                  <div className="footer-column">
                    <div className="footer-section">
                      <h3>Plans</h3>
                      <p>Paid memberships</p>
                      <p>For students</p>
                      <p>Business solutions</p>
                    </div>
        
                    <div className="footer-section">
                      <h3>Community</h3>
                      <p>Forums</p>
                      <p>Chapters</p>
                      <p>Events</p>
                    </div>
                  </div>
        
                  {/* COLUMN 4 */}
                  <div className="footer-column">
                    <div className="footer-section">
                      <h3>Subjects</h3>
                      <p>AI</p>
                      <p>Cloud Computing</p>
                      <p>Code Foundations</p>
                      <p>Computer Science</p>
                      <p>Cybersecurity</p>
                      <p>Data Analytics</p>
                      <p>Data Science</p>
                      <p>Data Visualization</p>
                      <p>Developer Tools</p>
                      <p>DevOps</p>
                      <p>Game Development</p>
                      <p>IT</p>
                      <p>Machine Learning</p>
                      <p>Math</p>
                      <p>Mobile Development</p>
                      <p>Web Design</p>
                      <p>Web Development</p>
                    </div>
                  </div>
        
                  {/* COLUMN 5 */}
                  <div className="footer-column">
                    <div className="footer-section">
                      <h3>Languages</h3>
                      <p>Bash</p>
                      <p>C</p>
                      <p>C++</p>
                      <p>C#</p>
                      <p>Go</p>
                      <p>HTML & CSS</p>
                      <p>Java</p>
                      <p>JavaScript</p>
                      <p>Kotlin</p>
                      <p>PHP</p>
                      <p>Python</p>
                      <p>R</p>
                      <p>Ruby</p>
                      <p>SQL</p>
                      <p>Swift</p>
                    </div>
                  </div>
        
                  {/* COLUMN 6 */}
                  <div className="footer-column">
                    <div className="footer-section">
                      <h3>Career building</h3>
                      <p>Career paths</p>
                      <p>Career services</p>
                      <p>Interview prep</p>
                      <p>Professional certification</p>
                      <p>-</p>
                      <p>Full Catalog</p>
                      <p>Beta Content</p>
                    </div>
                  </div>
        
                </div>
        
                {/* LINE */}
                <div className="footer-line"></div>
        
                {/* BOTTOM */}
                <div className="footer-bottom">
                  <div className="footer-bottom-left">
                    <p>Privacy Policy</p>
                    <p>Cookie Policy</p>
                    <p>Terms</p>
                  </div>
        
                  <div className="footer-bottom-right">
                    <p>Made with ❤️ NCodeX © 2023 NCodex </p>
                  </div>
                </div>
        
              </footer>
    </div>
  )
}

export default Footer;
