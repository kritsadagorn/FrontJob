import { iconProg } from "../data/icon"
import BoxCarousel from "./BoxCarousel"

function AppBox() {
  return (
    <section className="appbox-section relative text-white flex flex-col items-center justify-center py-16 w-full overflow-hidden">
      {/* Background patterns */}
      <div className="appbox-bg-pattern"></div>
      <div className="appbox-particles"></div>

      <div className="relative z-10 px-4 max-w-screen-xl w-full">
        <div className="appbox-content">
          <BoxCarousel data={iconProg} />
        </div>
      </div>
    </section>
  )
}

export default AppBox
