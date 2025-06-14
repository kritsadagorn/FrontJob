"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Radar } from "react-chartjs-2"
import { ArrowLeft, TrendingUp, TrendingDown, Minus, ExternalLink, Code, Briefcase, Star, Users } from "lucide-react"
import "chart.js/auto"
import "animate.css"

function PosDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [desdata, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getDesJob = async () => {
    try {
      setLoading(true)
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`)
      if (!resp.ok) throw new Error("Failed to fetch job data")
      const jobData = await resp.json()
      setData(jobData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDesJob()
  }, [id])

  const getTrendingIcon = (trending) => {
    switch (trending) {
      case "PEAK":
        return <TrendingUp className="w-5 h-5" />
      case "WEAK":
        return <TrendingDown className="w-5 h-5" />
      default:
        return <Minus className="w-5 h-5" />
    }
  }

  const getTrendingColor = (trending) => {
    switch (trending) {
      case "PEAK":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-600"
      case "WEAK":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-600"
      default:
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-600"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading position details...</p>
        </div>
      </div>
    )
  }

  if (error || !id || !desdata?.position) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
            <ExternalLink className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Position Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error || "The position you're looking for doesn't exist or has been removed."}
          </p>
          <button
            onClick={() => navigate("/position/comeng")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Positions
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Enhanced Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 dark:from-blue-900/10 dark:to-purple-900/10"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/position/comeng")}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Positions
          </button>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 dark:border-gray-700/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm ${getTrendingColor(desdata.trending?.name)}`}
                  >
                    {getTrendingIcon(desdata.trending?.name)}
                    {desdata.trending?.name || "N/A"}
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                    <Briefcase className="w-4 h-4" />
                    Position Details
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {desdata.position.name}
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                  {desdata.description ||
                    "Explore this exciting career opportunity in the tech industry with comprehensive skill requirements and growth potential."}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="lg:w-80 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Quick Overview
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Skills Required:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {desdata.position.job_skills?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Market Trend:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{desdata.trending?.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Computer Engineering</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Skills and Description */}
          <div className="xl:col-span-2 space-y-8">
            {/* Skills Section */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Required Skills</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                {(desdata.position.job_skills ?? []).map((item, index) => (
                  <a
                    key={index}
                    className="group bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-between"
                    href={`https://www.google.com/search?q=${item.skills.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{item.skills.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{item.score}%</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </a>
                ))}
              </div>

              {(desdata.position.job_skills ?? []).length === 0 && (
                <div className="text-center py-8">
                  <Code className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">No specific skills listed for this position.</p>
                </div>
              )}
            </div>

            {/* Description Section */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Role Overview</h2>
              </div>

              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
                  {desdata.description ||
                    "This position offers exciting opportunities to work with cutting-edge technologies and contribute to innovative projects in the computer engineering field."}
                </p>

                {desdata.responsibilities && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Responsibilities</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{desdata.responsibilities}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Chart */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 dark:border-gray-700/50 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Skills Analysis</h3>
              </div>

              {(desdata.position.job_skills ?? []).length > 0 ? (
                <div className="relative h-80">
                  <Radar
                    data={{
                      labels: (desdata.position.job_skills ?? []).map((i) => i.skills.name),
                      datasets: [
                        {
                          label: "Skill Proficiency",
                          data: (desdata.position.job_skills ?? []).map((i) => i.score),
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          borderColor: "rgba(59, 130, 246, 0.8)",
                          borderWidth: 3,
                          pointBackgroundColor: "rgba(59, 130, 246, 1)",
                          pointBorderColor: "#fff",
                          pointBorderWidth: 2,
                          pointRadius: 6,
                          pointHoverBackgroundColor: "#fff",
                          pointHoverBorderColor: "rgba(59, 130, 246, 1)",
                          pointHoverRadius: 8,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          backgroundColor: "rgba(17, 24, 39, 0.9)",
                          titleColor: "#fff",
                          bodyColor: "#fff",
                          borderColor: "rgba(59, 130, 246, 0.5)",
                          borderWidth: 1,
                          cornerRadius: 8,
                          displayColors: false,
                          callbacks: {
                            label: (context) => `Proficiency: ${context.parsed.r}%`,
                          },
                        },
                      },
                      scales: {
                        r: {
                          beginAtZero: true,
                          min: 0,
                          max: 100,
                          ticks: {
                            stepSize: 20,
                            color: "#6B7280",
                            backdropColor: "transparent",
                            font: { size: 11 },
                          },
                          pointLabels: {
                            font: { size: 12, weight: "500" },
                            color: "#374151",
                          },
                          grid: {
                            color: "rgba(156, 163, 175, 0.3)",
                            lineWidth: 1,
                          },
                          angleLines: {
                            color: "rgba(156, 163, 175, 0.3)",
                            lineWidth: 1,
                          },
                        },
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No skills data available for analysis.</p>
                </div>
              )}

              {/* Chart Legend */}
              {(desdata.position.job_skills ?? []).length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Skill Breakdown</h4>
                  <div className="space-y-2">
                    {(desdata.position.job_skills ?? []).slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{item.skills.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${item.score}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium w-8">{item.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PosDetail
