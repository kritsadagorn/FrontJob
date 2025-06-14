import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { websites } from "../data/websites"
import { ExternalLink, Briefcase, Star } from "lucide-react"

const Promote = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
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
    <section className="job-sites-section relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="job-sites-bg-pattern"></div>
      <div className="job-sites-particles"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-badge">
            <Briefcase className="w-4 h-4" />
            <span>Job Platforms</span>
          </div>
          <h2 className="section-title">
            Top <span className="text-gradient">Job Search Platforms</span>
          </h2>
          <p className="section-description">Discover the best platforms to find your next career opportunity</p>
        </div>

        {/* Slider Container */}
        <div className="job-sites-slider-container">
          <Slider {...settings} className="job-sites-slider">
            {websites.map((site, index) => (
              <div key={index} className="job-site-slide">
                <a href={site.link} target="_blank" rel="noopener noreferrer" className="job-site-card group">
                  <div className="job-site-card-inner">
                    {/* Header */}
                    <div className="job-site-header">
                      <div className="job-site-icon">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div className="job-site-badge">
                        <Star className="w-3 h-3" />
                        <span>Popular</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="job-site-content">
                      <h3 className="job-site-title">{site.name}</h3>
                      <p className="job-site-description">
                        Find thousands of job opportunities and connect with top employers
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="job-site-footer">
                      <span className="job-site-cta">Explore Jobs</span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="job-sites-note">
            💡 <strong>Pro Tip:</strong> Create profiles on multiple platforms to maximize your job search success
          </p>
        </div>
      </div>
    </section>
  )
}

export default Promote
