import { iconProg } from "../data/icon"
import { Code2, Sparkles } from "lucide-react"

function AppBox() {
  return (
    <section className="tech-showcase-section relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="tech-bg-pattern"></div>
      <div className="tech-particles"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-badge">
            <Sparkles className="w-4 h-4" />
            <span>Technologies</span>
          </div>
          <h2 className="section-title">
            Master the <span className="text-gradient">Latest Tech Stack</span>
          </h2>
          <p className="section-description">
            Explore the most in-demand programming languages and technologies that power today's digital world
          </p>
        </div>

        {/* Tech Grid */}
        <div className="tech-grid-container">
          <div className="tech-grid">
            {iconProg.slice(0, 24).map((tech, index) => (
              <div key={index} className="tech-card group" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="tech-icon-wrapper">
                  <img src={tech.url || "/placeholder.svg"} alt={tech.name} className="tech-icon" loading="lazy" />
                </div>
                <div className="tech-tooltip">{tech.name}</div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="tech-grid-overlay tech-grid-overlay-left"></div>
          <div className="tech-grid-overlay tech-grid-overlay-right"></div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="tech-cta-wrapper">
            <Code2 className="w-6 h-6 text-blue-500" />
            <p className="tech-cta-text">Ready to dive deeper? Explore detailed skill requirements for each position</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppBox
