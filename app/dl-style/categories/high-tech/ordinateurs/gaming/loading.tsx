export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mb-8"></div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mb-4"></div>

            {/* Price Range */}
            <div className="mb-6">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Specs Filter */}
            <div className="mb-6">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
