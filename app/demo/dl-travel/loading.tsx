export default function DLTravelLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
          <div className="w-8 h-8 bg-white rounded opacity-75"></div>
        </div>
        <h2 className="text-xl font-semibold mb-2">Chargement du CRM Voyage</h2>
        <p className="text-muted-foreground">Initialisation du système NovaCore...</p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  )
}
