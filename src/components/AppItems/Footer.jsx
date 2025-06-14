import { Heart, Code, Coffee } from "lucide-react"

const Footer = () => {
  return (
    <footer className="modern-footer relative overflow-hidden">
      {/* Background Elements */}
      <div className="footer-bg-pattern"></div>
      <div className="footer-particles"></div>

      <div className="footer-content relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="footer-main">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/OnlyLogoWhite.png" alt="Position Explorer" className="w-8 h-8" />
                <span className="footer-brand-text">Position Explorer</span>
              </div>
              <p className="footer-brand-description">
                Empowering your tech career journey with comprehensive insights and opportunities.
              </p>
            </div>

            {/* Links Sections */}
            <div className="footer-links-grid">
              <div className="footer-links-section">
                <h3 className="footer-links-title">Explore</h3>
                <ul className="footer-links-list">
                  <li>
                    <a href="/position/comeng" className="footer-link">
                      Positions
                    </a>
                  </li>
                  <li>
                    <a href="/learn" className="footer-link">
                      Learning
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="footer-link">
                      About Us
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-links-section">
                <h3 className="footer-links-title">Resources</h3>
                <ul className="footer-links-list">
                  <li>
                    <a href="#" className="footer-link">
                      Career Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Skill Assessment
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Industry Trends
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-links-section">
                <h3 className="footer-links-title">Connect</h3>
                <ul className="footer-links-list">
                  <li>
                    <a href="#" className="footer-link">
                      Community
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Newsletter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-link">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                <p>&copy; 2024 Position Explorer. All rights reserved.</p>
              </div>

              <div className="footer-made-with">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 mx-1" />
                <span>and</span>
                <Code className="w-4 h-4 text-blue-500 mx-1" />
                <span>and lots of</span>
                <Coffee className="w-4 h-4 text-amber-600 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
