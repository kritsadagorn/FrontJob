import './footer-theme.css'

const Footer = () => {
  return (
    <footer className="footer-section relative py-8 overflow-hidden">
      {/* Background patterns */}
      <div className="footer-bg-pattern"></div>
      <div className="footer-particles"></div>

      <div className="footer-content relative z-10">
        <div className="footer-text-wrapper">
          <p className="footer-text">Copyright © 2024 PosExplorer All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
