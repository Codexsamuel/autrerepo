export default function ReservationDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header Skeleton */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div>
                  <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Alert Skeleton */}
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Main Card Skeleton */}
              <div className="bg-white p-6 rounded-lg border">
                <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                        <div>
                          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                          <div className="w-40 h-3 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="w-36 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i}>
                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Flight Card Skeleton */}
              <div className="bg-white p-6 rounded-lg border">
                <div className="w-56 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <div key={i}>
                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="w-24 h-3 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="w-28 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="text-center">
                          <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mb-1 mx-auto"></div>
                          <div className="w-12 h-3 bg-gray-200 rounded animate-pulse mx-auto"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg border">
                  <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="flex justify-between">
                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                  {i === 3 && (
                    <div className="space-y-2 mt-4">
                      {[1, 2, 3, 4, 5].map((k) => (
                        <div key={k} className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
