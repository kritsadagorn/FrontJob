"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowDown, ExternalLink, Filter, Search } from "lucide-react"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

const DataTable = ({ data, onLanguageSelected, itemsPerPage, currentPage }) => {
  const navigate = useNavigate()

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

  return data.map((row, index) => {
    const rowNumber = currentPage * itemsPerPage + index + 1

    let trendClass = ""
    switch (row.trending) {
      case "PEAK":
        trendClass =
          "border-green-200 bg-green-100 text-green-800 dark:border-green-400 dark:bg-green-900/30 dark:text-green-300"
        break
      case "AVERAGE":
        trendClass =
          "border-yellow-200 bg-yellow-100 text-yellow-800 dark:border-yellow-400 dark:bg-yellow-900/30 dark:text-yellow-300"
        break
      case "WEAK":
        trendClass =
          "border-red-200 bg-red-100 text-red-800 dark:border-red-400 dark:bg-red-900/30 dark:text-red-300 font-light"
        break
      default:
        trendClass =
          "border-stone-200 bg-stone-100 text-stone-800 dark:border-stone-400 dark:bg-stone-800/30 dark:text-stone-300"
    }

    return (
      <tr
        key={row.id}
        className="bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm text-stone-900 dark:text-stone-100 hover:bg-stone-50/90 dark:hover:bg-stone-700/90 transition-all duration-200 border-b border-stone-200/50 dark:border-stone-700/50"
      >
        {/* Row Number - Hidden on mobile */}
        <td className="hidden md:table-cell text-center py-4 px-3 font-medium text-stone-600 dark:text-stone-400 w-16">
          {rowNumber}
        </td>

        {/* Position Name */}
        <td className="py-4 px-4 font-medium min-w-[200px] max-w-[300px]">
          <div className="flex flex-col">
            <button
              className="text-left font-semibold text-stone-900 dark:text-stone-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
              onClick={() => navigate(`/position-info/${row.id}`)}
            >
              <span className="line-clamp-2 text-sm lg:text-base">{row.position}</span>
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </button>
            {/* Mobile trending badge */}
            <div className="md:hidden mt-2">
              <span className={`${trendClass} rounded-full px-3 py-1 border text-xs font-medium`}>{row.trending}</span>
            </div>
          </div>
        </td>

        {/* Skills - Responsive layout with more space */}
        <td className="py-4 px-4 min-w-[400px] lg:min-w-[600px] xl:min-w-[800px]">
          <div className="space-y-2">
            {/* Desktop: Show more skills in organized rows */}
            <div className="hidden xl:block">
              {Array.from({ length: Math.ceil(row.skills.length / 6) }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap gap-1 mb-2">
                  {row.skills.slice(rowIndex * 6, rowIndex * 6 + 6).map(({ score, skills }, idx) => (
                    <Tippy
                      key={idx}
                      content={skills.group ?? "No description available"}
                      theme="custom"
                      animation="shift-away"
                      duration={[200, 150]}
                      delay={[100, 50]}
                      arrow={true}
                    >
                      <button
                        onClick={() =>
                          onLanguageSelected({
                            id: skills.id,
                            name: skills.name,
                          })
                        }
                        className={`${
                          groupskill[skills.group] ?? groupskill.OTHER
                        } border rounded-full text-xs py-1 px-2 transition-all hover:scale-105 whitespace-nowrap`}
                      >
                        {skills.name} ({score ?? 0}%)
                      </button>
                    </Tippy>
                  ))}
                </div>
              ))}
            </div>

            {/* Large Desktop: Show top 8 skills */}
            <div className="hidden lg:block xl:hidden">
              <div className="flex flex-wrap gap-1">
                {row.skills.slice(0, 8).map(({ score, skills }, idx) => (
                  <Tippy
                    key={idx}
                    content={skills.group ?? "No description available"}
                    theme="custom"
                    animation="shift-away"
                    duration={[200, 150]}
                    delay={[100, 50]}
                    arrow={true}
                  >
                    <button
                      onClick={() =>
                        onLanguageSelected({
                          id: skills.id,
                          name: skills.name,
                        })
                      }
                      className={`${
                        groupskill[skills.group] ?? groupskill.OTHER
                      } border rounded-full text-xs py-1 px-2 transition-all hover:scale-105 whitespace-nowrap`}
                    >
                      {skills.name} ({score ?? 0}%)
                    </button>
                  </Tippy>
                ))}
                {row.skills.length > 8 && (
                  <span className="text-xs text-stone-500 dark:text-stone-400 px-2 py-1">
                    +{row.skills.length - 8} more
                  </span>
                )}
              </div>
            </div>

            {/* Tablet: Show top 6 skills */}
            <div className="hidden md:block lg:hidden">
              <div className="flex flex-wrap gap-1">
                {row.skills.slice(0, 6).map(({ score, skills }, idx) => (
                  <Tippy
                    key={idx}
                    content={skills.group ?? "No description available"}
                    theme="custom"
                    animation="shift-away"
                    duration={[200, 150]}
                    delay={[100, 50]}
                    arrow={true}
                  >
                    <button
                      onClick={() =>
                        onLanguageSelected({
                          id: skills.id,
                          name: skills.name,
                        })
                      }
                      className={`${
                        groupskill[skills.group] ?? groupskill.OTHER
                      } border rounded-full text-xs py-1 px-2 transition-all hover:scale-105 whitespace-nowrap`}
                    >
                      {skills.name} ({score ?? 0}%)
                    </button>
                  </Tippy>
                ))}
                {row.skills.length > 6 && (
                  <span className="text-xs text-stone-500 dark:text-stone-400 px-2 py-1">
                    +{row.skills.length - 6} more
                  </span>
                )}
              </div>
            </div>

            {/* Mobile: Show top 3 skills */}
            <div className="md:hidden">
              <div className="flex flex-wrap gap-1">
                {row.skills.slice(0, 3).map(({ score, skills }, idx) => (
                  <Tippy
                    key={idx}
                    content={skills.group ?? "No description available"}
                    theme="custom"
                    animation="shift-away"
                    duration={[200, 150]}
                    delay={[100, 50]}
                    arrow={true}
                  >
                    <button
                      onClick={() =>
                        onLanguageSelected({
                          id: skills.id,
                          name: skills.name,
                        })
                      }
                      className={`${
                        groupskill[skills.group] ?? groupskill.OTHER
                      } border rounded-full text-xs py-1 px-2 transition-all hover:scale-105 whitespace-nowrap`}
                    >
                      {skills.name}
                    </button>
                  </Tippy>
                ))}
                {row.skills.length > 3 && (
                  <span className="text-xs text-stone-500 dark:text-stone-400 px-2 py-1">+{row.skills.length - 3}</span>
                )}
              </div>
            </div>
          </div>
        </td>

        {/* Trending - Hidden on mobile (shown in position cell) */}
        <td className="hidden md:table-cell py-4 px-4 text-center w-32">
          <span className={`${trendClass} rounded-full px-4 py-2 border font-medium text-sm whitespace-nowrap`}>
            {row.trending}
          </span>
        </td>
      </tr>
    )
  })
}

const MainTable = ({ currentPage, handlePageChange, data, trendingSort, onTrendingSortToggle, onLanguageSelected }) => {
  const [name, setName] = useState("")

  return (
    <div className="table-container h-full">
      {/* Header Section */}
      <div className="table-header bg-white/90 dark:bg-stone-800/90 backdrop-blur-md p-4 md:p-6 border-b border-stone-200/50 dark:border-stone-700/50">
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
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-600 rounded-full px-4 py-2 text-sm font-medium shadow-sm">
              <Filter className="w-4 h-4" />
              <span className="font-semibold">{name}</span>
              <button
                onClick={() => {
                  setName("")
                  onLanguageSelected("")
                }}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded-full transition-all duration-200 text-xs shadow hover:shadow-md"
                title="Clear Focus"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table Container with Fixed Height */}
      <div className="table-body-container bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm">
        <div className="h-full overflow-auto custom-scrollbar">
          <table className="w-full border-collapse table-fixed">
            {/* Table Header */}
            <thead className="sticky top-0 bg-stone-50/95 dark:bg-stone-900/95 backdrop-blur-md z-10">
              <tr className="border-b border-stone-200/50 dark:border-stone-700/50">
                <th className="hidden md:table-cell text-center py-4 px-3 font-semibold text-stone-900 dark:text-stone-100 text-sm w-16">
                  #
                </th>
                <th className="text-left py-4 px-4 font-semibold text-stone-900 dark:text-stone-100 w-[200px] lg:w-[250px] xl:w-[300px]">
                  Position
                </th>
                <th className="text-left py-4 px-4 font-semibold text-stone-900 dark:text-stone-100">
                  <div className="flex items-center gap-2">
                    <span>Skills Required</span>
                    <Search className="w-4 h-4 text-stone-500" />
                  </div>
                </th>
                <th className="hidden md:table-cell text-center py-4 px-4 font-semibold text-stone-900 dark:text-stone-100 relative w-32">
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
              {data.length > 0 ? (
                <DataTable
                  data={data}
                  onLanguageSelected={({ id, name }) => {
                    onLanguageSelected(id)
                    setName(name)
                  }}
                  currentPage={currentPage}
                  itemsPerPage={10}
                />
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
      <div className="table-footer bg-white/90 dark:bg-stone-800/90 backdrop-blur-md p-4 border-t border-stone-200/50 dark:border-stone-700/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-stone-600 dark:text-stone-400">
          <div>
            Showing {data.length} position{data.length !== 1 ? "s" : ""}
            {name && (
              <span className="ml-1">
                filtered by <strong>{name}</strong>
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full"></div>
              <span>Peak</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded-full"></div>
              <span>Average</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-100 border border-red-300 rounded-full"></div>
              <span>Weak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainTable
