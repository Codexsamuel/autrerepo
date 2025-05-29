export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Chargement de DL Business Suite</h3>
          <p className="text-muted-foreground">Préparation de votre CRM entreprise...</p>
        </div>
      </div>
    </div>
  )
}
