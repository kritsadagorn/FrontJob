import { Link } from "react-router-dom"
import { ArrowRight, Code, Briefcase, TrendingUp } from "lucide-react"
import "animate.css"

function AppMidText() {
  return (
    <section className="hero-section-modern relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern Particle Background */}
      <div className="particles-container">
        <div className="particles-layer-1"></div>
        <div className="particles-layer-2"></div>
        <div className="particles-layer-3"></div>
        <div className="floating-shapes"></div>
        <div className="gradient-orbs"></div>
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <div className="hero-title-wrapper mb-8">
            <h1 className="hero-title animate__animated animate__fadeInUp">
              <span className="hero-title-accent">~position</span>
              <br />
              <span className="hero-title-main">explorer</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle animate__animated animate__fadeInUp animate__delay-500ms">
              Discover your perfect career path in tech with comprehensive insights, trending opportunities, and
              detailed role analysis
            </p>
          </div>

          {/* Feature Pills */}
          <div className="hero-features animate__animated animate__fadeInUp animate__delay-1s">
            <div className="feature-pill">
              <Code className="w-4 h-4" />
              <span>Tech Roles</span>
            </div>
            <div className="feature-pill">
              <TrendingUp className="w-4 h-4" />
              <span>Market Trends</span>
            </div>
            <div className="feature-pill">
              <Briefcase className="w-4 h-4" />
              <span>Career Insights</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hero-cta animate__animated animate__fadeInUp animate__delay-1500ms">
            <Link to="/position/comeng" className="cta-button group">
              <span>Explore Positions</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats animate__animated animate__fadeInUp animate__delay-2s">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Tech Roles</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Job Insights</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Updated Data</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-dot"></div>
      </div>
    </section>
  )
}

export default AppMidText
