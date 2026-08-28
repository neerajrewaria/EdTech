import React from 'react';
import { FiCode } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <style>
        {`
          .footer-premium {
            background: var(--background, #090a10);
            color: var(--text-secondary, #94a3b8);
            border-top: 1px solid var(--border, rgba(255, 255, 255, 0.08));
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
          }
          .light .footer-premium,
          .home-page.light .footer-premium {
            background: var(--background, #f8fafc) !important;
            color: var(--text-secondary, #334155) !important;
            border-top: 1px solid var(--border, rgba(15, 23, 42, 0.08)) !important;
          }
          .footer-premium .footer-logo {
            font-family: var(--font-heading, 'Space Grotesk', sans-serif);
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 0%, #6366f1 60%, #38bdf8 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .light .footer-premium .footer-logo,
          .home-page.light .footer-premium .footer-logo {
            background: linear-gradient(135deg, #0f172a 0%, #6366f1 60%, #0284c7 100%);
            -webkit-background-clip: text;
            background-clip: text;
          }
          .footer-logo-mark {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--accent, #38bdf8) 100%);
            color: #ffffff;
          }
          .footer-premium .footer-section h3 {
            color: var(--text-primary, #f8fafc);
            font-family: var(--font-heading, 'Space Grotesk', sans-serif);
            font-weight: 700;
          }
          .light .footer-premium .footer-section h3,
          .home-page.light .footer-premium .footer-section h3 {
            color: var(--text-primary, #0f172a) !important;
          }
          .footer-premium .footer-section p,
          .footer-premium .footer-bottom p {
            color: var(--text-secondary, #94a3b8);
            cursor: pointer;
            transition: color 0.2s ease-in-out;
          }
          .light .footer-premium .footer-section p,
          .light .footer-premium .footer-bottom p,
          .home-page.light .footer-premium .footer-section p,
          .home-page.light .footer-premium .footer-bottom p {
            color: var(--text-secondary, #475569) !important;
          }
          .footer-premium .footer-section p:hover,
          .footer-premium .footer-bottom p:hover {
            color: var(--accent, #38bdf8);
          }
          .light .footer-premium .footer-section p:hover,
          .light .footer-premium .footer-bottom p:hover,
          .home-page.light .footer-premium .footer-section p:hover,
          .home-page.light .footer-premium .footer-bottom p:hover {
            color: var(--primary, #6366f1) !important;
          }
          .footer-social-link {
            color: var(--text-muted, #64748b);
            font-size: 1.25rem;
            transition: color 0.2s ease-in-out, transform 0.2s ease;
          }
          .footer-social-link:hover {
            color: var(--accent, #38bdf8);
            transform: translateY(-2px);
          }
          .light .footer-social-link:hover,
          .home-page.light .footer-social-link:hover {
            color: var(--primary, #6366f1);
          }
          .footer-tagline {
            margin-top: 1rem;
            line-height: 1.6;
            font-size: 14px;
            max-width: 250px;
          }
          .footer-line {
            height: 1px;
            background: var(--border, rgba(255, 255, 255, 0.08));
            margin: 32px 0 24px;
          }
          .light .footer-line,
          .home-page.light .footer-line {
            background: var(--border, rgba(15, 23, 42, 0.08));
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
