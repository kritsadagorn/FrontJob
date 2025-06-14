import { Typewriter } from "react-simple-typewriter"
import { Quote, Target, Zap } from "lucide-react"

function DescApp() {
  return (
    <section className="inspiration-section relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="inspiration-bg-pattern"></div>
      <div className="inspiration-particles"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inspiration-container">
          {/* Quote Icon */}
          <div className="inspiration-icon">
            <Quote className="w-8 h-8" />
          </div>

          {/* Main Content */}
          <div className="inspiration-content">
            <div className="typewriter-wrapper">
              <Typewriter
                words={[
                  "Unlock your potential, explore endless career possibilities",
                  "Transform your passion into a thriving tech career",
                  "Navigate the future of technology with confidence",
                  "Discover opportunities that match your unique skills",
                ]}
                typeSpeed={50}
                deleteSpeed={30}
                delaySpeed={3000}
                cursor
                loop={true}
              />
            </div>

            {/* Animated Underline */}
            <div className="inspiration-underline"></div>
          </div>

          {/* Feature Highlights */}
          <div className="inspiration-features">
            <div className="inspiration-feature">
              <Target className="w-5 h-5" />
              <span>Targeted Insights</span>
            </div>
            <div className="inspiration-feature">
              <Zap className="w-5 h-5" />
              <span>Real-time Data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DescApp
