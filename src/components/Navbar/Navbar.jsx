"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Sun, Moon, ChevronDown, Globe, Code, BookOpen, Users, Home } from "lucide-react"
import "./Navbar.css"

function Navbar() {
  const [lang, setLang] = useState("EN")
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check darkMode from localStorage on load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode")
    if (savedMode === "true") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode
      if (newMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      localStorage.setItem("darkMode", newMode)
      return newMode
    })
  }

  // Toggle language function
  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "EN" ? "TH" : "EN"))
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Close mobile menu when clicking a nav link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // Check if current path is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { path: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { path: "/position/comeng", label: "Positions", icon: <Code className="w-4 h-4" /> },
    { path: "/learn", label: "Learn", icon: <BookOpen className="w-4 h-4" /> },
    { path: "/contact", label: "About", icon: <Users className="w-4 h-4" /> },
  ]

  return (
    <nav className={`navbar-container ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-wrapper">
        {/* Logo Section */}
        <Link to="/" onClick={closeMobileMenu} className="navbar-logo">
          <img
            src={darkMode ? "/OnlyLogoWhite.png" : "/OnlyLogoBlack.png"}
            alt="Position Explorer"
            className="logo-image"
          />
          <div className="logo-text">
            Position Explorer
            <span className="logo-beta">Beta</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`nav-link ${isActive(item.path) ? "active" : ""}`}>
              <span className="hidden xl:inline-flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
              <span className="xl:hidden">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button onClick={toggleDarkMode} className="action-button theme-toggle">
            <Sun className={`theme-icon sun ${darkMode ? "hidden" : "block"}`} />
            <Moon className={`theme-icon moon ${darkMode ? "block" : "hidden"}`} />
          </button>

          {/* Language Toggle */}
          <button onClick={toggleLanguage} className="language-button">
            <Globe className="w-4 h-4 mr-1" />
            {lang}
            <ChevronDown className="w-3 h-3 ml-1" />
          </button>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className={`mobile-toggle ${mobileMenuOpen ? "open" : ""}`}>
            <div className="hamburger">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          {/* Mobile Navigation Links */}
          <div className="mobile-nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`mobile-nav-link ${isActive(item.path) ? "active" : ""}`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="mobile-actions">
            <button onClick={toggleDarkMode} className="mobile-theme-toggle">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
            </button>

            <button onClick={toggleLanguage} className="language-button">
              <Globe className="w-4 h-4 mr-1" />
              {lang}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
