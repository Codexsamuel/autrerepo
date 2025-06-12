export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
        <div className="text-xl font-medium">Chargement...</div>
      </div>
    </div>
  )
}
