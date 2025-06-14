"use client"

import { useEffect, useState } from "react"
import { Search, FilterIcon, X } from "lucide-react"

function Filter({ onFilterUpdate }) {
  const [positiongroup, setPositionGroup] = useState([])
  const [positionGroupIds, setPositionGroupIds] = useState([])
  const [query, setQuery] = useState("")
  const [positionSort, setPositionSort] = useState("asc")
  const [isExpanded, setIsExpanded] = useState(false)

  async function loadPositionGroups() {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/query/position-group`)
    const js = await resp.json()
    setPositionGroup(js)
  }

  function updatePositionGroupQuery(e) {
    const positionId = e.target.id
    const isChecked = e.target.checked
    if (isChecked) {
      setPositionGroupIds((p) => [...new Set([...p, positionId])])
    } else {
      setPositionGroupIds((p) => {
        const idx = p.indexOf(positionId)
        if (idx !== -1) p.splice(idx, 1)
        return [...p]
      })
    }
  }

  function clearAllFilters() {
    setPositionGroupIds([])
    setQuery("")
  }

  function doCall() {
    onFilterUpdate?.({
      positionSort,
      positionGroupIds,
      searchQuery: query,
    })
  }

  useEffect(() => {
    void loadPositionGroups()
  }, [])

  useEffect(() => {
    doCall()
  }, [positionSort, query, positionGroupIds])

  const activeFiltersCount = positionGroupIds.length + (query ? 1 : 0)

  return (
    <div className="bg-white/90 dark:bg-stone-800/90 backdrop-blur-md h-full flex flex-col rounded-l-xl lg:rounded-r-none border-r border-stone-200/50 dark:border-stone-700/50">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-stone-200/50 dark:border-stone-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FilterIcon className="w-5 h-5 text-stone-600 dark:text-stone-400" />
            <h2 className="text-stone-900 dark:text-stone-100 font-semibold text-lg">Filters</h2>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <X className="w-5 h-5" /> : <FilterIcon className="w-5 h-5" />}
          </button>
        </div>

        {/* Clear all filters */}
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="mt-3 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear all filters
          </button>
        )}
      </div>

      {/* Filter Content */}
      <div className={`flex-1 overflow-hidden ${isExpanded ? "block" : "hidden lg:block"}`}>
        <div className="p-4 lg:p-6 space-y-6 h-full overflow-y-auto">
          {/* Search Bar */}
          <div className="space-y-3">
            <label className="text-stone-700 dark:text-stone-300 text-sm font-medium block">Search Positions</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by position name..."
                value={query}
                className="w-full py-3 px-4 pr-10 rounded-lg border border-stone-300/50 dark:border-stone-600/50 bg-white/80 dark:bg-stone-700/80 backdrop-blur-sm text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 dark:text-stone-400">
                <Search size={20} />
              </div>
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Position Categories */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-stone-700 dark:text-stone-300 text-sm font-medium">Position Categories</label>
              {positionGroupIds.length > 0 && (
                <span className="text-xs text-stone-500 dark:text-stone-400">{positionGroupIds.length} selected</span>
              )}
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
              {positiongroup.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <input
                    type="checkbox"
                    id={item.id}
                    onChange={updatePositionGroupQuery}
                    checked={positionGroupIds.includes(item.id.toString())}
                    className="w-4 h-4 text-blue-600 bg-stone-100/80 dark:bg-stone-700/80 border-stone-300/50 dark:border-stone-600/50 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 transition-all"
                  />
                  <label
                    htmlFor={item.id}
                    className="text-sm text-stone-700 dark:text-stone-300 cursor-pointer hover:text-stone-900 dark:hover:text-stone-100 transition-colors flex-1 py-1"
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-stone-50/80 dark:bg-stone-700/50 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100">Filter Summary</h4>
            <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
              <div>Categories: {positionGroupIds.length} selected</div>
              <div>Search: {query ? `"${query}"` : "None"}</div>
              <div>Total filters: {activeFiltersCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
