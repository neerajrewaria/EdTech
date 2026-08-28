import React from 'react';
import { FiCode } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <style>
        {`
          .footer-premium {
            background: #050509 !important;
            color: #6b7280 !important;
            border-top: 1px solid #1f2937;
          }
          .footer-premium .footer-section h3 {
            color: #ffffff !important;
          }
          .footer-premium .footer-section p:hover,
          .footer-premium .footer-bottom p:hover {
            color: #c026d3;
            transition: color 0.2s ease-in-out;
          }
          .footer-social-link {
            color: #6b7280;
            font-size: 1.25rem;
            transition: color 0.2s ease-in-out;
          }
          .footer-social-link:hover {
            color: #c026d3;
          }
          .footer-tagline {
            margin-top: 1rem;
            line-height: 1.6;
            font-size: 14px;
            max-width: 250px;
          }
        `}
      </style>
      <footer className="footer footer-premium">
        <div className="footer-top">
          {/* COLUMN 1 */}
          <div className="footer-column">
            <div className="footer-brand">
              <span className="footer-logo-mark">
                <FiCode />
              </span>
              <h2 className="footer-logo">NCodeX</h2>
            </div>
            
            <p className="footer-tagline">
              Empowering the next generation of developers with world-class tech education and industry-leading skills.
            </p>

            <div className="footer-icons" style={{ marginTop: '1rem' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub"><FaGithub /></a>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="footer-column">
            <div className="footer-section">
              <h3>Company</h3>
              <p>About</p>
              <p>Careers</p>
              <p>Affiliates</p>
            </div>
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
            <p>Made with ❤️ NCodeX © 2023 NCodeX </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
