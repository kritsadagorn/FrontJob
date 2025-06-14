"use client"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 0; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(0)

      if (currentPage <= 2) {
        // Show first few pages
        for (let i = 1; i <= 3; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages
        pages.push("ellipsis")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Show pages around current
        pages.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center gap-2 p-6 bg-white/90 dark:bg-stone-800/90 backdrop-blur-md border-t border-stone-200/50 dark:border-stone-700/50">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${
            currentPage === 0
              ? "text-stone-400 dark:text-stone-600 cursor-not-allowed"
              : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-700"
          }
        `}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <div key={`ellipsis-${index}`} className="px-2 py-2">
                <MoreHorizontal className="w-4 h-4 text-stone-400" />
              </div>
            )
          }

          const isActive = currentPage === page

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`
                min-w-[40px] h-10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-700"
                }
              `}
            >
              {page + 1}
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${
            currentPage === totalPages
              ? "text-stone-400 dark:text-stone-600 cursor-not-allowed"
              : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-700"
          }
        `}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Page Info */}
      <div className="hidden md:flex items-center gap-2 ml-4 text-sm text-stone-600 dark:text-stone-400">
        <span>Page</span>
        <span className="font-medium text-stone-900 dark:text-stone-100">{currentPage + 1}</span>
        <span>of</span>
        <span className="font-medium text-stone-900 dark:text-stone-100">{totalPages + 1}</span>
      </div>
    </div>
  )
}

export default Pagination
