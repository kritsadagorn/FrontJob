"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowDown, ExternalLink, Filter, Search, TrendingUp, TrendingDown, Minus } from "lucide-react"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

const MainTable = ({ currentPage, handlePageChange, data, trendingSort, onTrendingSortToggle, onLanguageSelected }) => {
  const [name, setName] = useState("")
  const [screenSize, setScreenSize] = useState("lg")
  const navigate = useNavigate()

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) setScreenSize("sm")
      else if (width < 768) setScreenSize("md")
      else if (width < 1024) setScreenSize("lg")
      else if (width < 1280) setScreenSize("xl")
      else setScreenSize("2xl")
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const groupskill = {
    PROGRAMMING_LANG:
      "border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300 duration-300 hover:bg-blue-200 dark:hover:bg-blue-800/50",
    FRAMEWORK:
      "border-purple-200 bg-purple-100 text-purple-800 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-300 duration-300 hover:bg-purple-200 dark:hover:bg-purple-800/50",
    LIBRARY:
      "border-green-200 bg-green-100 text-green-800 dark:border-green-400 dark:bg-green-900/30 dark:text-green-300 duration-300 hover:bg-green-200 dark:hover:bg-green-800/50",
    OTHER:
      "border-stone-200 bg-stone-100 text-stone-800 dark:border-stone-400 dark:bg-stone-800/30 dark:text-stone-300 duration-300 hover:bg-stone-200 dark:hover:bg-stone-700/50",
  }

  const getSkillsToShow = () => {
    switch (screenSize) {
      case "sm":
        return 3
      case "md":
        return 4
      case "lg":
        return 5
      case "xl":
        return 6
      case "2xl":
        return 8
      default:
        return 5
    }
  }

  const getTrendingConfig = (trending) => {
    switch (trending) {
      case "PEAK":
        return {
          icon: <TrendingUp className="w-4 h-4" />,
          className:
            "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500 shadow-lg shadow-green-500/25",
          label: "Peak",
        }
      case "WEAK":
        return {
          icon: <TrendingDown className="w-4 h-4" />,
          className: "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-500 shadow-lg shadow-red-500/25",
          label: "Weak",
        }
      case "AVERAGE":
      default:
        return {
          icon: <Minus className="w-4 h-4" />,
          className:
            "bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-yellow-500 shadow-lg shadow-yellow-500/25",
          label: "Average",
        }
    }
  }

  console.log("MainTable render - data:", data, "length:", data?.length) // Debug log

  return (
    <div className="h-full flex flex-col">
      {/* Header Section */}
      <div className="flex-shrink-0 bg-white/90 dark:bg-stone-800/90 backdrop-blur-md p-4 md:p-6 border-b border-stone-200/50 dark:border-stone-700/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Computer Engineering Positions
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mt-1 text-sm lg:text-base">
              Explore career opportunities and skill requirements
            </p>
          </div>

          {/* Active Filter Display */}
          {name && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg shadow-blue-500/25">
              <Filter className="w-4 h-4" />
              <span className="font-semibold">{name}</span>
              <button
                onClick={() => {
                  setName("")
                  onLanguageSelected("")
                }}
                className="ml-2 bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-full transition-all duration-200 text-xs"
                title="Clear Focus"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm overflow-hidden">
        <div className="h-full overflow-auto custom-scrollbar">
          <table className="w-full border-collapse min-w-full">
            {/* Table Header */}
            <thead className="sticky top-0 bg-stone-50/95 dark:bg-stone-900/95 backdrop-blur-md z-10">
              <tr className="border-b border-stone-200/50 dark:border-stone-700/50">
                <th className="hidden lg:table-cell text-center py-4 px-3 font-semibold text-stone-900 dark:text-stone-100 text-sm w-16">
                  #
                </th>
                <th className="text-left py-4 px-4 font-semibold text-stone-900 dark:text-stone-100 min-w-[200px]">
                  Position
                </th>
                <th className="text-left py-4 px-4 font-semibold text-stone-900 dark:text-stone-100">
                  <div className="flex items-center gap-2">
                    <span>Skills Required</span>
                    <Search className="w-4 h-4 text-stone-500" />
                  </div>
                </th>
                <th className="hidden md:table-cell text-center py-4 px-4 font-semibold text-stone-900 dark:text-stone-100 w-32">
                  <div className="flex items-center justify-center gap-2">
                    <span>Trending</span>
                    <button
                      onClick={() => onTrendingSortToggle()}
                      className={`transition-transform duration-300 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 ${
                        trendingSort === "desc" ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <ArrowDown size={16} />
                    </button>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data && data.length > 0 ? (
                data.map((row, index) => {
                  const rowNumber = currentPage * 10 + index + 1
                  const trendingConfig = getTrendingConfig(row.trending)
                  const skillsToShow = getSkillsToShow()

                  return (
                    <tr
                      key={row.id || index}
                      className="bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm text-stone-900 dark:text-stone-100 hover:bg-stone-50/90 dark:hover:bg-stone-700/90 transition-all duration-200 border-b border-stone-200/50 dark:border-stone-700/50"
                    >
                      {/* Row Number */}
                      <td className="hidden lg:table-cell text-center py-4 px-3 font-medium text-stone-600 dark:text-stone-400">
                        {rowNumber}
                      </td>

                      {/* Position Name */}
                      <td className="py-4 px-4 font-medium">
                        <div className="flex flex-col">
                          <button
                            className="text-left font-semibold text-stone-900 dark:text-stone-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                            onClick={() => navigate(`/position-info/${row.id}`)}
                          >
                            <span className="text-sm lg:text-base">{row.position}</span>
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          </button>
                          {/* Mobile trending badge */}
                          <div className="md:hidden mt-2">
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${trendingConfig.className}`}
                            >
                              {trendingConfig.icon}
                              {trendingConfig.label}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Skills */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {row.skills && row.skills.length > 0 ? (
                            <>
                              {row.skills.slice(0, skillsToShow).map((skillItem, idx) => {
                                const skill = skillItem.skills || skillItem
                                const score = skillItem.score || 0

                                return (
                                  <Tippy
                                    key={idx}
                                    content={skill.group || "No description available"}
                                    theme="custom"
                                    animation="shift-away"
                                    duration={[200, 150]}
                                    delay={[100, 50]}
                                    arrow={true}
                                  >
                                    <button
                                      onClick={() =>
                                        onLanguageSelected({
                                          id: skill.id,
                                          name: skill.name,
                                        })
                                      }
                                      className={`${
                                        groupskill[skill.group] || groupskill.OTHER
                                      } border rounded-full text-xs py-1 px-2 transition-all hover:scale-105 whitespace-nowrap`}
                                    >
                                      {skill.name} {screenSize !== "sm" ? `(${score}%)` : ""}
                                    </button>
                                  </Tippy>
                                )
                              })}
                              {row.skills.length > skillsToShow && (
                                <span className="text-xs text-stone-500 dark:text-stone-400 px-2 py-1">
                                  +{row.skills.length - skillsToShow} more
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-xs text-stone-500 dark:text-stone-400 px-2 py-1">
                              No skills listed
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Trending */}
                      <td className="hidden md:table-cell py-4 px-4 text-center">
                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${trendingConfig.className}`}
                        >
                          {trendingConfig.icon}
                          {trendingConfig.label}
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <Search className="w-12 h-12 text-stone-400" />
                      <div>
                        <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-1">
                          No positions found
                        </h3>
                        <p className="text-stone-600 dark:text-stone-400">
                          Try adjusting your search criteria or filters
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer with Stats */}
      <div className="flex-shrink-0 bg-white/90 dark:bg-stone-800/90 backdrop-blur-md p-4 border-t border-stone-200/50 dark:border-stone-700/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-stone-600 dark:text-stone-400">
          <div>
            Showing {data?.length || 0} position{data?.length !== 1 ? "s" : ""}
            {name && (
              <span className="ml-1">
                filtered by <strong>{name}</strong>
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-sm"></div>
              <span>Peak</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full shadow-sm"></div>
              <span>Average</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-full shadow-sm"></div>
              <span>Weak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainTable
