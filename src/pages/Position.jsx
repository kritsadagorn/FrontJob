"use client"

// Position.js
import { useEffect, useState } from "react"
import "../components/Position/pos-box.css"
import "animate.css"
import Filter from "../components/Position/Filter.jsx"
import MainTable from "../components/Position/MainTable.jsx"
import Pagination from "@/components/Position/Pagination"

function Position() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([])
  const [filter, setFilter] = useState({
    is_updated: false,
    positionSort: "asc",
    trendingSort: "desc",
    positionGroupIds: [],
    searchQuery: "",
  })

  // Pagination
  const [page, setPage] = useState(0)
  const [pageTotal, setPageTotal] = useState(0)
  // Select program language
  const [selectedProgramLanguage, setSelectedProgramLanguage] = useState("")

  const handlePageChange = (page) => {
    setPage(page)
    window.scrollTo(0, 0)
  }
  async function loadJobs() {
    const resp = await fetch(
      `${import.meta.env.VITE_API_URL}/api/jobs?${new URLSearchParams({
        sortPos: filter.positionSort,
        sortTrending: filter.trendingSort,
        groupOfPos: filter.positionGroupIds,
        search: filter.searchQuery,
        language: selectedProgramLanguage,
        page,
      }).toString()}`,
    )
    const js = await resp.json()
    setPageTotal(js.pagination.pageTotal)
    // Reset data
    const result = []
    for (const data of js.items ?? []) {
      const transformed = {
        id: data.id,
        position: data.position.name,
        trending: data.trending.name,
        skills: data.position.job_skills ?? [],
      }
      result.push(transformed)
    }

    setData(result)
    // console.log(data, result)
  }
  useEffect(() => {
    return () => {
      void loadJobs()
    }
  }, [])

  useEffect(() => {
    if (filter.is_updated) {
      void loadJobs()
    }
  }, [filter, page])

  useEffect(() => {
    void loadJobs()
  }, [selectedProgramLanguage])

  return (
    <>
      {/* Enhanced Background Section */}
      <section className="position-page-background relative min-h-screen overflow-hidden">
        {/* Particles Container */}
        <div className="particles-container">
          <div className="particles-layer-1"></div>
          <div className="particles-layer-2"></div>
          <div className="particles-layer-3"></div>
          <div className="floating-shapes"></div>
          <div className="gradient-orbs"></div>
        </div>

        {/* Content - Fixed sizes for different resolutions */}
        <div className="relative z-10 pt-[70px] md:pt-[80px] pb-8">
          <div className="position-container bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm flex flex-col lg:flex-row rounded-xl shadow-lg border border-white/20 dark:border-stone-700/50">
            {/* Sidebar Filter - Fixed widths */}
            <div className="filter-sidebar flex-shrink-0">
              <Filter
                onFilterUpdate={(data) => {
                  setFilter((p) => ({
                    ...data,
                    trendingSort: p.trendingSort,
                    is_updated: true,
                  }))
                }}
              />
            </div>

            {/* Main Table Section - Takes remaining space */}
            <div className="table-section flex flex-col flex-1 min-w-0">
              <MainTable
                // Sort trending function
                onTrendingSortToggle={() => {
                  setFilter((p) => ({
                    ...p,
                    trendingSort: p.trendingSort === "asc" ? "desc" : "asc",
                  }))
                }}
                trendingSort={filter.trendingSort}
                data={data}
                currentPage={page}
                handlePageChange={handlePageChange}
                onLanguageSelected={(val) => {
                  setSelectedProgramLanguage(val)
                }}
              />
              {/* Pagination */}
              <Pagination currentPage={page} totalPages={pageTotal} handlePageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Position
