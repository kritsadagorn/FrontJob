import { Typewriter } from "react-simple-typewriter"

function DescApp() {
  return (
    <section className="desc-section relative flex justify-center items-center px-4 py-12 overflow-hidden">
      {/* Background patterns */}
      <div className="desc-bg-pattern"></div>
      <div className="desc-particles"></div>

      <div className="desc-container relative z-10">
        <div className="desc-content">
          <div className="desc-text-wrapper">
            <span className="desc-text">
              <Typewriter
                words={["Unlock your potential, explore endless career possibilities"]}
                typeSpeed={70}
                deleteSpeed={0}
                delaySpeed={5000}
                cursor
                loop={true}
              />
            </span>
          </div>
          <div className="desc-animated-border"></div>
        </div>
      </div>
    </section>
  )
}

export default DescApp
