export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Test Page</h1>
        <p className="text-xl">Cette page fonctionne correctement</p>
        <p className="text-sm mt-2">Timestamp: {new Date().toISOString()}</p>
      </div>
    </div>
  );
} 