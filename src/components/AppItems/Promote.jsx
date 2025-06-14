import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { websites } from "../data/websites"

const Promote = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 7000,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <section className="promote-section relative py-16 overflow-hidden">
      {/* Background with circuit patterns */}
      <div className="promote-bg-pattern"></div>
      <div className="promote-particles"></div>

      <div className="relative z-10">
        <div className="promote-header-container">
          <h3 className="promote-header">
            <em>Top Job Search Sites</em>
          </h3>
        </div>

        <div className="promote-slider-container">
          <Slider {...settings} className="promote-slider">
            {websites.map((site, index) => (
              <div key={index} className="promote-slide-wrapper">
                <a href={site.link} target="_blank" rel="noopener noreferrer" className="promote-card-link">
                  <div className="promote-card">
                    <div className="promote-card-inner">
                      <h2 className="promote-card-title">{site.name}</h2>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Promote
