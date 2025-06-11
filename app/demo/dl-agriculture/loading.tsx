export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold mb-2">Chargement Nova Agriculture ERP</h2>
        <p className="text-muted-foreground">Initialisation du système agricole...</p>
      </div>
    </div>
  )
}
